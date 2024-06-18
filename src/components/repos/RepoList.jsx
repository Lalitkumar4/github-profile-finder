import { useContext, useEffect } from "react"
import GithubContext from "../../context/GithubContext"
import { useNavigate, useParams } from "react-router-dom"
import RepoItem from "./RepoItem"
import Spinner from "../layout/Spinner"
import { FaArrowLeft } from "react-icons/fa"

const RepoList = () => {
  const { repos, getUserRepos, loading } = useContext(GithubContext)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getUserRepos(params.login)
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className="mb-4">
        <button onClick={() => navigate(-1)} className="text-white">
          <FaArrowLeft />
        </button>
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
