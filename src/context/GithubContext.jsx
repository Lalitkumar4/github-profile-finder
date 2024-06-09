import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

// eslint-disable-next-line react/prop-types
export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get initial users (testing purposes)
  const fetchUsers = async () => {
    setLoading()
    const response = await fetch(`${import.meta.env.VITE_GITHUB_URL}/users`)

    const data = await response.json()

    dispatch({
      type: "GET_USERS",
      payload: data,
    })
  }

  // Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" })

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
