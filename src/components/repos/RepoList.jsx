import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import RepoItem from "./RepoItem"
import Spinner from "../layout/Spinner"
import GithubContext from "../../context/GithubContext"
import BackButton from "../layout/BackButton"

const RepoList = () => {
  const { repos, getUserRepos, loading } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getUserRepos(params.login)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className="mb-4">
        <BackButton />
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
