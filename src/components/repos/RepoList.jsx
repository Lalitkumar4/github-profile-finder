import { useContext, useEffect } from "react"
import GithubContext from "../../context/GithubContext"
import { useParams } from "react-router-dom"
import Slider from "./Slider"
import Spinner from "../layout/Spinner"

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
    <div>
      {repos.map((repo) => (
        <Slider key={repo.id} repo={repo} />
      ))}
    </div>
  )
}

export default RepoList
