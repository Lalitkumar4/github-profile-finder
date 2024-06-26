import { useContext } from "react"
import PropTypes from "prop-types"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import GithubContext from "../../context/GithubContext"

const PaginationButtons = ({ type }) => {
  const {
    user,
    getUserFollowers,
    getUserFollowing,
    getUserRepos,
    getUserGists,
    currentPage,
    totalPages,
    searchUsers,
    searchTerm,
  } = useContext(GithubContext)

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      if (type === "users") {
        searchUsers(searchTerm, currentPage + 1)
      } else if (type === "followers") {
        getUserFollowers(user.login, currentPage + 1)
      } else if (type === "following") {
        getUserFollowing(user.login, currentPage + 1)
      } else if (type === "repos") {
        getUserRepos(user.login, null, 30, currentPage + 1)
      } else if (type === "gists") {
        getUserGists(user.login, currentPage + 1)
      }
    }
  }

  // Handle prev page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      if (type === "users") {
        searchUsers(searchTerm, currentPage - 1)
      } else if (type === "followers") {
        getUserFollowers(user.login, currentPage - 1)
      } else if (type === "following") {
        getUserFollowing(user.login, currentPage - 1)
      } else if (type === "repos") {
        getUserRepos(user.login, null, 30, currentPage - 1)
      } else if (type === "gists") {
        getUserGists(user.login, currentPage - 1)
      }
    }
  }

  return (
    <div className="flex justify-center w-2/6 mx-auto mt-4 space-x-3 sm:justify-between lg:w-1/5 md:w-1/4 sm:w-2/4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`flex items-center px-2 py-1 ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-500 cursor-pointer hover:bg-[#21262C] rounded-md"
        }`}
      >
        {currentPage !== 1 && <FaAngleLeft className="mr-2" />}
        Previous
      </button>
      <span className="px-2 py-1 text-white">{currentPage}</span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`flex items-center px-2 py-1 ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-500 cursor-pointer hover:bg-[#21262C] rounded-md"
        }`}
      >
        Next
        {currentPage !== totalPages && <FaAngleRight className="ml-2" />}
      </button>
    </div>
  )
}

PaginationButtons.propTypes = {
  type: PropTypes.string,
}

export default PaginationButtons
