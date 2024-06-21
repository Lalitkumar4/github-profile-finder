import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

// eslint-disable-next-line react/prop-types
export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    userFollowers: [],
    userFollowing: [],
    gists: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search results
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    const response = await fetch(
      `${import.meta.env.VITE_GITHUB_URL}/search/users?${params}`,
      {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    )

    const { items } = await response.json()

    // Fetching info for each user
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
  }

  // Get single user
  const getUser = async (login) => {
    setLoading()

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
  }

  // Get user repos
  const getUserRepos = async (login, limit = null) => {
    setLoading()

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

    const data = await response.json()

    dispatch({
      type: "GET_REPOS",
      payload: data,
    })
  }

  // Get user followers
  const getUserFollowers = async (login) => {
    setLoading()

    const response = await fetch(
      `${import.meta.env.VITE_GITHUB_URL}/users/${login}/followers`,
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

      // Fetching info for each user
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
    }
  }

  // Get user following
  const getUserFollowing = async (login) => {
    setLoading()

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

      // Fetching info for each user
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
  }

  // Get gists
  const getGists = async (login) => {
    setLoading()

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
  }

  // Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" })

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
        searchUsers,
        getUser,
        getUserRepos,
        getUserFollowers,
        getUserFollowing,
        getGists,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
