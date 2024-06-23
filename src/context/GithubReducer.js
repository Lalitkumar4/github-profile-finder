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
    default:
      return state
  }
}

export default githubReducer
