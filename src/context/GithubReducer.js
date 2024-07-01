const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      }
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      }
    case "GET_REPOS":
      return {
        ...state,
        repos: action.payload,
      }
    case "GET_USER_FOLLOWERS":
      return {
        ...state,
        userFollowers: action.payload,
      }
    case "GET_USER_FOLLOWING":
      return {
        ...state,
        userFollowing: action.payload,
      }
    case "GET_GISTS":
      return {
        ...state,
        gists: action.payload,
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      }
    case "SET_SEARCHED":
      return {
        ...state,
        searched: false,
      }
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      }
    case "SET_TOTAL_PAGES":
      return {
        ...state,
        totalPages: action.payload,
      }
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      }
    case "RESET_ERROR":
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default githubReducer
