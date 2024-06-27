import { createContext, useEffect, useReducer } from "react"
import axios from "axios"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

// Axios instance
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
})

// eslint-disable-next-line react/prop-types
export const GithubProvider = ({ children }) => {
  const initialState = {
    searchTerm: "",
    users: [],
    user: {},
    repos: [],
    userFollowers: [],
    userFollowing: [],
    gists: [],
    loading: false,
    searched: true,
    currentPage: Number(localStorage.getItem("currentPage")) || 1,
    totalPages: 0,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  useEffect(() => {
    localStorage.setItem("currentPage", state.currentPage)
  }, [state.currentPage])

  // Get search results
  const searchUsers = async (text, page = 1, perPage = 30) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const params = new URLSearchParams({
        q: text,
        page,
        per_page: perPage,
      })

      const response = await github.get(`/search/users?${params}`)

      const { items, total_count } = response.data

      const totalPages = Math.ceil(total_count / perPage)

      // Fetching more details for each user
      const userInfo = await fetchDetailedUsers(items)

      dispatch({
        type: "GET_USERS",
        payload: userInfo,
      })

      // Set search term for pagination
      dispatch({ type: "SET_SEARCH_TERM", payload: text })

      // Set page
      setPage(page, totalPages)

      dispatch({ type: "SET_SEARCHED" })
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  // Get single user
  const getUser = async (login) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Reset currentPage to 1 when fetching a new user
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 })

      const response = await github.get(`/users/${login}`)

      if (response.status === 404) {
        window.location = "/notfound"
      } else {
        dispatch({
          type: "GET_USER",
          payload: response.data,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  // Get user followers
  const getUserFollowers = async (
    login,
    page = state.currentPage,
    perPage = 30
  ) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const params = new URLSearchParams({
        page,
        per_page: perPage,
      })

      const response = await github.get(`/users/${login}/followers?${params}`)

      if (response.status === 404) {
        window.location = "/notfound"
      } else {
        // Fetching more details for each user
        const userFollowerInfo = await fetchDetailedUsers(response.data)

        dispatch({
          type: "GET_USER_FOLLOWERS",
          payload: userFollowerInfo,
        })

        // Calculate total pages only after user data is available
        const userData = await fetchUser(login)

        const totalPages = Math.ceil(userData.followers / perPage)

        // Set page
        setPage(page, totalPages)
      }
    } catch (error) {
      console.groupEnd(error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  // Get user following
  const getUserFollowing = async (
    login,
    page = state.currentPage,
    perPage = 30
  ) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const params = new URLSearchParams({
        page,
        per_page: perPage,
      })

      const response = await github.get(`/users/${login}/following?${params}`)

      if (response.status === 404) {
        window.location = "/notfound"
      } else {
        // Fetching more details for each user
        const userFollowingInfo = await fetchDetailedUsers(response.data)

        dispatch({
          type: "GET_USER_FOLLOWING",
          payload: userFollowingInfo,
        })

        // Calculate total pages only after user data is available
        const userData = await fetchUser(login)

        const totalPages = Math.ceil(userData.following / perPage)

        // Set page
        setPage(page, totalPages)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  // Get user repos
  const getUserRepos = async (
    login,
    limit = null,
    perPage = 30,
    page = state.currentPage
  ) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const params = new URLSearchParams({
        sort: "created",
        per_page: limit || perPage,
        page,
      })

      const response = await github.get(`/users/${login}/repos?${params}`)

      if (response.status === 404) {
        window.location = "/notfound"
      } else {
        dispatch({
          type: "GET_REPOS",
          payload: response.data,
        })

        if (!limit) {
          // Calculate total pages only after user data is available
          const userData = await fetchUser(login)

          const totalPages = Math.ceil(userData.public_repos / perPage)

          // Set page
          setPage(page, totalPages)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  // Get gists
  const getUserGists = async (
    login,
    page = state.currentPage,
    perPage = 30
  ) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const params = new URLSearchParams({
        page,
        per_page: perPage,
      })

      const response = await github.get(`/users/${login}/gists?${params}`)

      if (response.status === 404) {
        window.location = "/notfound"
      } else {
        dispatch({
          type: "GET_GISTS",
          payload: response.data,
        })

        // Calculate total pages only after user data is available
        const userData = await fetchUser(login)

        const totalPages = Math.ceil(userData.public_gists / perPage)

        // Set page
        setPage(page, totalPages)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  // function: Fetching more details for each user
  const fetchDetailedUsers = async (items) => {
    const userDetails = await Promise.all(
      items.map(async (user) => {
        const response = await axios.get(user.url, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        })
        return response.data
      })
    )
    return userDetails
  }

  // Function: Calculate total pages only after user data is available
  const fetchUser = async (login) => {
    const userResponse = await github.get(`/users/${login}`)
    return userResponse.data
  }

  // Set page function
  const setPage = (page, totalPages) => {
    // Current page
    dispatch({ type: "SET_CURRENT_PAGE", payload: page })
    // Total pages
    dispatch({ type: "SET_TOTAL_PAGES", payload: totalPages })
  }

  return (
    <GithubContext.Provider
      value={{
        ...state,
        getUser,
        getUserRepos,
        getUserFollowers,
        getUserFollowing,
        getUserGists,
        searchUsers,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
