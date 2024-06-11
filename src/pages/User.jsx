import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FaLink, FaMapMarkerAlt, FaTwitter, FaBuilding } from "react-icons/fa"
import Spinner from "../components/layout/Spinner"
import GithubContext from "../context/GithubContext"

const User = () => {
  const { getUser, user, loading } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getUser(params.login)
  }, [])

  const {
    login,
    name,
    avatar_url,
    location,
    bio,
    company,
    blog,
    twitter_username,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
  } = user

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="text-white rounded-xl p-8 bg-[#161B22]">
      <div className="grid lg:grid-cols-5 md:grid-cols-3">
        <div>
          <div className="wrapper">
            <figure>
              <img
                src={avatar_url}
                alt="avatar"
                className="object-cover w-full h-full rounded-3xl"
              />
            </figure>
            <div className="mt-8">
              <h1 className="mb-0 text-2xl font-medium text-white">{name}</h1>
              <p className="flex-grow-0 text-lg font-thin text-gray-400">
                {login}
              </p>
            </div>
          </div>

          {bio && (
            <div className="mt-4">
              <p>{bio}</p>
            </div>
          )}

          <a
            href={html_url}
            target="_blank"
            rel="noreferrer"
            className="block mt-4 bg-[#292E36] w-full text-center border-[#30363D] rounded-md border p-1 text-sm font-medium text-gray-300 hover:bg-[#30363D]"
          >
            Visit Github Profile
          </a>

          <div className="mt-7">
            {company && (
              <div className="flex items-center">
                <FaBuilding className="mr-3 text-gray-400" />
                <p className="text-sm">{company}</p>
              </div>
            )}
            {location && (
              <div className="flex items-center mt-2">
                <FaMapMarkerAlt className="mr-3 text-gray-400" />
                <p className="text-sm">{location}</p>
              </div>
            )}
            {blog && (
              <div className="flex items-center mt-2">
                <FaLink className="mr-3 text-gray-400" />
                <a
                  href={`https://${blog}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:text-blue-500 hover:underline"
                >
                  {blog}
                </a>
              </div>
            )}
            {twitter_username && (
              <div className="flex items-center mt-2">
                <FaTwitter className="mr-3 text-gray-400" />
                <a
                  href={`https://twitter.com/${twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:text-blue-500 hover:underline"
                >
                  {twitter_username}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
