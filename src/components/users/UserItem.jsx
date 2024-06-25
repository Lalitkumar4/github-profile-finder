import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { FaUserFriends } from "react-icons/fa"
import { format } from "date-fns"

const UserItem = ({ user }) => {
  const {
    avatar_url,
    bio,
    login,
    name,
    location,
    public_repos,
    followers,
    created_at,
  } = user

  // formate date
  const formatDate = (dateString) => {
    return format(dateString, "MMMM d, y")
  }

  // Add k if value is above 1000
  const formatValue = (value) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k"
    }
    return value
  }

  return (
    // User item card
    <div className="p-5 border border-gray-600 bg-[#161B22] rounded-lg">
      <div className="flex flex-row space-x-4 text-white">
        {/* Profile picture */}
        <div>
          <div className="avatar">
            <div className="w-16 h-16">
              <img className="rounded-full" src={avatar_url} alt="Avatar" />
            </div>
          </div>
        </div>
        <div>
          {/* Full name link */}
          <Link
            to={`/user/${login}`}
            className="mr-2 text-xl text-blue-500 break-all hover:underline "
          >
            {name}
          </Link>

          {/* Username link */}
          <Link
            to={`/user/${login}`}
            className="font-thin text-gray-400 hover:underline"
          >
            {login}
          </Link>

          {/* User bio */}
          {bio && <p className="my-1 text-sm max-h-fit">{bio}</p>}

          <div className="flex justify-between my-1 space-x-2">
            {/* User location */}
            {location && <p className="text-sm text-gray-400">{location}</p>}

            {/* User repos count */}
            <div className="flex space-x-1">
              {/* Repo svg icon */}
              <div>
                <svg
                  fill="#ffffffab"
                  aria-hidden="true"
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  data-view-component="true"
                  className="octicon octicon-repo color-fg-muted"
                >
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
              </div>
              {/* Repo count */}
              <p className="text-sm text-gray-400">{public_repos}</p>
            </div>

            {/* User followers count */}
            <div className="flex space-x-1">
              <div>
                <FaUserFriends className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-400">{formatValue(followers)}</p>
            </div>
          </div>

          {/* User created date */}
          <div className="mt-1 text-sm text-gray-400 date">
            <p>Created at {formatDate(created_at)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserItem
