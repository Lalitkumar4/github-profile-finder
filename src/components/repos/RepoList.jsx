import { useContext, useEffect } from "react"
import GithubContext from "../../context/GithubContext"
import { useParams } from "react-router-dom"
import Slider from "./Slider"

const RepoList = () => {
  const { repos, getUserRepos } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getUserRepos(params.login)
  }, [])

  return (
    <div>
      {repos.map((repo) => (
        <Slider key={repo.id} repo={repo} />
      ))}
    </div>
  )
}

export default RepoList
