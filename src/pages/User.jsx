import { useContext, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import {
  FaLink,
  FaMapMarkerAlt,
  FaTwitter,
  FaBuilding,
  FaArrowLeft,
  FaUserFriends,
  FaCode,
} from "react-icons/fa"
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

  // check for valid url to users website
  const websiteURL = blog?.startsWith("http") ? blog : "https://" + blog

  return (
    <div className="text-white rounded-xl p-8 bg-[#161B22]">
      <div className="mb-4">
        <Link to="/" className="text-white">
          <FaArrowLeft />
        </Link>
      </div>
      <div className="grid gap-4 xl:gap-10 lg:grid-cols-5 md:grid-cols-4">
        <div className="col-span-4 lg:col-span-1 md:col-span-1">
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
                <FaLink className="mr-3 text-gray-400 shrink-0" />
                <a
                  href={websiteURL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm break-all hover:text-blue-500 hover:underline"
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
        <div className="col-span-4 lg:col-span-4 md:col-span-3">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2">
            <div className="flex bg-[#0D1117] rounded-xl p-3 ">
              <div className="p-3 mr-3 rounded-md bg-cyan-500">
                <FaUserFriends className="text-xl" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Followers</div>
                <div className="font-semibold">{followers}</div>
              </div>
            </div>
            <div className="flex bg-[#0D1117] rounded-xl p-3">
              <div className="p-3 mr-3 bg-green-300 rounded-md">
                <FaUserFriends className="text-xl" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Following</div>
                <div className="font-semibold">{following}</div>
              </div>
            </div>
            <div className="flex bg-[#0D1117] rounded-xl p-3">
              <div className="p-3 mr-3 bg-purple-400 rounded-md">
                <svg
                  fill="#fff"
                  aria-hidden="true"
                  height="20"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="20"
                  data-view-component="true"
                  className="octicon octicon-repo color-fg-muted"
                >
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-400">Repositories</div>
                <div className="font-semibold">{public_repos}</div>
              </div>
            </div>
            <div className="flex bg-[rgb(13,17,23)] rounded-xl p-3">
              <div className="p-3 mr-3 bg-red-400 rounded-md">
                <FaCode className="text-xl" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Gists</div>
                <div className="font-semibold">{public_gists}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
