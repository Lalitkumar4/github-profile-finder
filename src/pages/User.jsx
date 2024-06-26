import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  FaLink,
  FaMapMarkerAlt,
  FaTwitter,
  FaBuilding,
  FaUserFriends,
  FaCode,
} from "react-icons/fa"
import RepoSlider from "../components/repos/RepoSlider"
import Spinner from "../components/layout/Spinner"
import BackButton from "../components/layout/BackButton"
import UserStats from "../components/layout/UserStats"
import GithubContext from "../context/GithubContext"
import Error from "../components/layout/Error"
import GitHubContributionsCalendar from "../components/gitHubCalendar/GitHubContributionsCalendar"

const User = () => {
  const { getUser, user, getUserRepos, repos, loading, error, resetError } =
    useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getUser(params.login)
    getUserRepos(params.login, 10) // limit 10 for slider

    // Cleanup function to reset error when component unmounts
    return () => {
      resetError()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // check for valid url to users website
  const websiteURL = blog?.startsWith("http") ? blog : "https://" + blog

  // Add k if value is above 1000
  const formatValue = (value) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k"
    }
    return value
  }

  if (error.status !== null || error.message !== null) {
    return <Error />
  }

  // Spinner
  if (loading) {
    return <Spinner />
  }

  return (
    // User div
    <div className="p-8 text-white bg-[#0000003a] rounded-xl">
      {/* Back button */}
      <div className="mb-4">
        <BackButton />
      </div>
      {/* User grid layout */}
      <div className="grid grid-cols-2 md:gap-4 xl:gap-10 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
        {/* Columns */}
        <div className="col-span-2 sm:col-span-2 lg:col-span-1 md:col-span-1">
          {/* Sidebar */}
          <div className="wrapper">
            {/* Profile Image */}
            <figure>
              <img
                src={avatar_url}
                alt="avatar"
                className="object-cover w-full h-full rounded-3xl"
              />
            </figure>

            {/* Name and username */}
            <div className="mt-8">
              <h1 className="mb-0 text-2xl font-medium text-white">{name}</h1>
              <p className="flex-grow-0 text-lg font-thin text-gray-400">
                {login}
              </p>
            </div>
          </div>

          {/* User bio */}
          {bio && (
            <div className="mt-4">
              <p>{bio}</p>
            </div>
          )}

          {/* Visit github profile link button */}
          <a
            href={html_url}
            target="_blank"
            rel="noreferrer"
            className="block mt-4 bg-[#292E36] w-full text-center border-[#30363D] rounded-md border p-1 text-sm font-medium text-gray-300 hover:bg-[#30363D]"
          >
            Visit Github Profile
          </a>

          <div className="my-7">
            {/* User company */}
            {company && (
              <div className="flex items-center">
                <FaBuilding className="mr-3 text-gray-400" />
                <p className="text-sm">{company}</p>
              </div>
            )}

            {/* User location */}
            {location && (
              <div className="flex items-center mt-2">
                <FaMapMarkerAlt className="mr-3 text-gray-400" />
                <p className="text-sm">{location}</p>
              </div>
            )}

            {/* User blog link */}
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

            {/* User twitter handle */}
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

        {/* Right sidebar */}
        <div className="col-span-4 lg:col-span-4 md:col-span-3">
          {/* Columns */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2">
            {/* User Stats for followers */}
            <UserStats
              to={`/user/${login}/followers`}
              icon={<FaUserFriends className="text-xl" />}
              bgColor="bg-cyan-500"
              label="Followers"
              count={formatValue(followers)}
            />

            {/* User Stats for following */}
            <UserStats
              to={`/user/${login}/following`}
              icon={<FaUserFriends className="text-xl" />}
              bgColor="bg-green-300"
              label="Following"
              count={formatValue(following)}
            />

            {/* User Stats for repos */}
            <UserStats
              to={`/user/${login}/repos`}
              icon={
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
              }
              bgColor="bg-purple-400"
              label="Repositories"
              count={formatValue(public_repos)}
            />

            {/* User Stats for gists */}
            <UserStats
              to={`/user/${login}/gists`}
              icon={<FaCode className="text-xl" />}
              bgColor="bg-red-400 "
              label="Gists"
              count={formatValue(public_gists)}
            />
          </div>

          {/* Repo slider */}
          <div className="col-span-4">
            <RepoSlider repos={repos} />
          </div>

          {/* Github Calender */}
          <div className="p-4 mt-16 border border-gray-700 rounded-lg">
            <GitHubContributionsCalendar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
