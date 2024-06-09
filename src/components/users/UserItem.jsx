import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const UserItem = ({ user: { login, avatar_url } }) => {
  return (
    <div className="p-5 bg-[#161B22] rounded-lg">
      <div className="flex flex-row items-center space-x-4 text-white">
        <div>
          <div className="avatar">
            <div className="w-16 h-16">
              <img
                className="rounded-full border-[#1d4ed8] border-2"
                src={avatar_url}
                alt="Profile"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl text-sky-500">{login}</h2>
          <Link to={`/user/${login}`} className="text-sm text-gray-400">
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserItem
