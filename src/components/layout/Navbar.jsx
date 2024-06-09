import { FaGithub } from "react-icons/fa"
import PropTypes from "prop-types"

const Navbar = ({ title = "Github Profile Finder" }) => {
  return (
    <nav className="p-4 mb-12 shadow-lg bg-[#161B22] text-white">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <FaGithub className="inline pr-2 text-4xl" />
          <span className="text-lg font-bold align-middle">{title}</span>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
