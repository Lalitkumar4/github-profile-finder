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
      const userInfo = await Promise.all(
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

      dispatch({
        type: "GET_USERS",
        payload: userInfo,
      })

      // Set search term for pagination
      dispatch({ type: "SET_SEARCH_TERM", payload: text })

      // Current page
      dispatch({ type: "SET_CURRENT_PAGE", payload: page })
      // Total pages
      dispatch({ type: "SET_TOTAL_PAGES", payload: totalPages })

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

  // Get user repos
  const getUserRepos = async (login, limit = null) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const params = new URLSearchParams({
        sort: "created",
        per_page: limit,
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

        // Fetching more details for each user followers
        const userFollowerInfo = await Promise.all(
          data.map(async (userFollower) => {
            const response = await fetch(userFollower.url, {
              headers: {
                Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
              },
            })
            const data = await response.json()
            return data
          })
        )

        dispatch({
          type: "GET_USER_FOLLOWERS",
          payload: userFollowerInfo,
        })

        // Calculate total pages only after user data is available
        const userResponse = await fetch(
          `${import.meta.env.VITE_GITHUB_URL}/users/${login}`,
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        )

        const userData = await userResponse.json()

        const totalPages = Math.ceil(userData.followers / perPage)

        // Current page
        dispatch({ type: "SET_CURRENT_PAGE", payload: page })
        // Total pages
        dispatch({ type: "SET_TOTAL_PAGES", payload: totalPages })
      }
    } catch (error) {
      console.groupEnd(error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  // Get user following
  const getUserFollowing = async (login) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const response = await fetch(
        `${import.meta.env.VITE_GITHUB_URL}/users/${login}/following`,
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

        // Fetching more details for each user following
        const userFollowingInfo = await Promise.all(
          data.map(async (userFollowing) => {
            const response = await fetch(userFollowing.url, {
              headers: {
                Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
              },
            })
            const data = await response.json()
            return data
          })
        )

        dispatch({
          type: "GET_USER_FOLLOWING",
          payload: userFollowingInfo,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  // Get gists
  const getGists = async (login) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const response = await fetch(
        `${import.meta.env.VITE_GITHUB_URL}/users/${login}/gists`,
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
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        userFollowers: state.userFollowers,
        userFollowing: state.userFollowing,
        gists: state.gists,
        searched: state.searched,
        currentPage: state.currentPage,
        totalPages: state.totalPages,
        searchTerm: state.searchTerm,
        searchUsers,
        getUser,
        getUserRepos,
        getUserFollowers,
        getUserFollowing,
        getGists,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
