import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { useContext } from "react"
import PropTypes from "prop-types"
import GithubContext from "../../context/GithubContext"

const BackButton = ({ type }) => {
  const {
    user,
    getUserFollowers,
    getUserFollowing,
    getUserRepos,
    getUserGists,
    currentPage,
    dispatch,
    error,
  } = useContext(GithubContext)

  const navigate = useNavigate()

  const handleBackButton = () => {
    // Back when followers page is above 1
    if (currentPage > 1) {
      const decreaseCurrentPage = currentPage - 1

      dispatch({ type: "SET_CURRENT_PAGE", payload: decreaseCurrentPage })

      if (type === "followers") {
        getUserFollowers(user.login, decreaseCurrentPage)
      } else if (type === "following") {
        getUserFollowing(user.login, decreaseCurrentPage)
      } else if (type === "repos") {
        getUserRepos(user.login, null, 30, decreaseCurrentPage)
      } else if (type === "gists") {
        getUserGists(user.login, decreaseCurrentPage)
      }
    } else {
      navigate(-1)
    }
  }

  return (
    <button onClick={() => handleBackButton()} className="text-white">
      {error.status !== null || error.message !== null ? (
        <div className="px-4 py-2 text-white bg-blue-700 rounded-full hover:scale-105 hover:bg-blue-500 hover:transition-all">
          <FaArrowLeft className="inline mr-2" />
          Go Back
        </div>
      ) : (
        <FaArrowLeft />
      )}
    </button>
  )
}

BackButton.propTypes = {
  type: PropTypes.string,
}

export default BackButton
