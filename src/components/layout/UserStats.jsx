import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const UserStats = ({ to, icon, bgColor, label, count }) => {
  return (
    <>
      <Link to={to}>
        <div className="flex bg-[#161B22] rounded-xl p-3 hover:scale-105 transition-all border border-gray-700">
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

export default UserStats
