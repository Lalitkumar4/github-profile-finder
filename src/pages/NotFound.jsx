import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

const NotFound = () => {
  return (
    <div className="hero">
      <div className="text-center hero-content">
        <h1 className="mb-8 font-bold text-blue-700 text-8xl">404</h1>
        <p className="mb-3 text-2xl text-white">
          Looks like this page doesn&apos;t exist!
        </p>
        <p className="mb-10 text-gray-300">
          Go back to home and continue exploring.
        </p>
        <Link
          to="/"
          className="p-4 text-white bg-blue-700 rounded-full hover:p-5 hover:bg-blue-500 hover:transition-all"
        >
          <FaArrowLeft className="inline mr-2" />
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
