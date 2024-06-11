import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

// eslint-disable-next-line react/prop-types
export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
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
      `${import.meta.env.VITE_GITHUB_URL}/search/users?${params}`
    )

    const { items } = await response.json()

    dispatch({
      type: "GET_USERS",
      payload: items,
    })
  }

  // Get single user
  const getUser = async (login) => {
    setLoading()

    const response = await fetch(
      `${import.meta.env.VITE_GITHUB_URL}/users/${login}`
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

  // Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" })

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext