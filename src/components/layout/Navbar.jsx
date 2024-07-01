import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { FaGithub } from "react-icons/fa"

const Navbar = ({ title = "Github User Explorer" }) => {
  const navigate = useNavigate()

  return (
    <nav className="p-4 mb-8 shadow-lg bg-[#161B22] text-white">
      <div className="container mx-auto">
        <div
          onClick={() => navigate("/")}
          className="flex-none inline px-2 mx-2 cursor-pointer"
        >
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
