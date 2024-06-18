import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const UserStats = ({ to, icon, bgColor, label, count }) => {
  return (
    <>
      <Link to={to}>
        <div className="flex bg-[#0D1117] rounded-xl p-3 hover:scale-105 transition-all">
          <div className={`p-3 mr-3 rounded-md ${bgColor}`}>{icon}</div>
          <div>
            <div className="text-sm text-gray-400">{label}</div>
            <div className="font-semibold">{count}</div>
          </div>
        </div>
      </Link>
    </>
  )
}

UserStats.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  bgColor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
}

export default UserStats
