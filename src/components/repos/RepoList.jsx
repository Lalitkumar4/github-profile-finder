import { useContext, useEffect } from "react"
import GithubContext from "../../context/GithubContext"
import { Link, useParams } from "react-router-dom"
import RepoItem from "./RepoItem"
import Spinner from "../layout/Spinner"
import { FaArrowLeft } from "react-icons/fa"

const RepoList = () => {
  const { repos, getUserRepos, loading } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getUserRepos(params.login)
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className="mb-4">
        <Link to="/" className="text-white">
          <FaArrowLeft />
        </Link>
      </div>
      <div>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </>
  )
}

export default RepoList
