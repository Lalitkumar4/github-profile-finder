import { FaGithub } from "react-icons/fa"
import PropTypes from "prop-types"

const Navbar = ({ title }) => {
  return (
    <nav className="p-4 mb-12 shadow-lg dark:bg-[#161B22] dark:text-white bg-white text-black">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <FaGithub className="inline pr-2 text-3xl" />
          <span className="text-lg font-bold align-middle">{title}</span>
        </div>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  title: "Github Profile Finder",
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
