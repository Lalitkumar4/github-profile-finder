import { useContext } from "react"
import { useLocation } from "react-router-dom"
import GithubContext from "../../context/GithubContext"
import BackButton from "./BackButton"

const Error = () => {
  const { error } = useContext(GithubContext)

  const location = useLocation()

  // If user offline show custom error message
  if (error.message.toLowerCase().includes("network error")) {
    return (
      <>
        <div className="text-center text-white mt-14">
          <h1 className="mb-3 text-4xl font-medium">Oops!</h1>
          <p className="my-1 text-2xl font-medium text-blue-300">
            No internet connection!
          </p>
          <p>
            Something went wrong. Try refreshing the page or checking your
            internet connection.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="text-center mt-14">
        {error.status && (
          <h1 className="text-5xl font-bold text-blue-700 sm:text-6xl">
            {error.status}
          </h1>
        )}
        <p className="mt-3 text-xl text-white sm:text-2xl">{error.message}</p>
        {location.pathname !== "/" && (
          <div className="mt-5">
            <BackButton />
          </div>
        )}
      </div>
    </>
  )
}

export default Error
