import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { useContext } from "react"
import PropTypes from "prop-types"
import GithubContext from "../../context/GithubContext"

const BackButton = ({ type }) => {
  const { currentPage, dispatch, getUserFollowers, user } =
    useContext(GithubContext)

  const navigate = useNavigate()

  const back = () => {
    // Back when followers page is above 1
    if (currentPage > 1) {
      const decreaseCurrentPage = currentPage - 1

      dispatch({ type: "SET_CURRENT_PAGE", payload: decreaseCurrentPage })

      if (type === "followers") {
        getUserFollowers(user.login, decreaseCurrentPage)
      }
    } else {
      navigate(-1)
    }
  }

  return (
    <button onClick={() => back()} className="text-white">
      <FaArrowLeft />
    </button>
  )
}

BackButton.propTypes = {
  type: PropTypes.string,
}

export default BackButton
