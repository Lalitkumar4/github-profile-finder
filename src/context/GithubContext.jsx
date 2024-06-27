import { createContext, useEffect, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

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

      const response = await fetch(
        `${import.meta.env.VITE_GITHUB_URL}/search/users?${params}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      )

      const { items, total_count } = await response.json()

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

      const response = await fetch(
        `${import.meta.env.VITE_GITHUB_URL}/users/${login}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      )

      if (response.status === 404) {
        window.location = "/notfound"
      } else {
        const data = await response.json()

        dispatch({
          type: "GET_USER",
          payload: data,
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

      const response = await fetch(
        `${import.meta.env.VITE_GITHUB_URL}/users/${login}/followers?${params}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      )

      if (response.status === 404) {
        window.location = "/notfound"
      } else {
        const data = await response.json()

        // Fetching more details for each user
        const userFollowerInfo = await fetchDetailedUsers(data)

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

      const response = await fetch(
        `${import.meta.env.VITE_GITHUB_URL}/users/${login}/following?${params}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      )

      if (response.status === 404) {
        window.location = "/notfound"
      } else {
        const data = await response.json()

        // Fetching more details for each user
        const userFollowingInfo = await fetchDetailedUsers(data)

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

      const response = await fetch(
        `${import.meta.env.VITE_GITHUB_URL}/users/${login}/repos?${params}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      )

      if (response.status === 404) {
        window.location = "/notfound"
      } else {
        const data = await response.json()

        dispatch({
          type: "GET_REPOS",
          payload: data,
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

      const response = await fetch(
        `${import.meta.env.VITE_GITHUB_URL}/users/${login}/gists?${params}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      )

      if (response.status === 404) {
        window.location = "/notfound"
      } else {
        const data = await response.json()

        dispatch({
          type: "GET_GISTS",
          payload: data,
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
        const response = await fetch(user.url, {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        })
        const data = await response.json()
        return data
      })
    )
    return userDetails
  }

  // Function: Calculate total pages only after user data is available
  const fetchUser = async (login) => {
    const userResponse = await fetch(
      `${import.meta.env.VITE_GITHUB_URL}/users/${login}`,
      {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    )
    const userData = await userResponse.json()
    return userData
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
