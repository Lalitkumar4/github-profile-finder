import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import RepoItem from "./RepoItem"
import Spinner from "../layout/Spinner"
import BackButton from "../layout/BackButton"
import NoContentMsg from "../layout/NoContentMsg"
import GithubContext from "../../context/GithubContext"

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
      {/* Back button */}
      <div className="mb-4">
        <BackButton />
      </div>
      <div>
        {/* No content message */}
        {!loading && repos.length === 0 ? (
          <div className="text-center text-white">
            <NoContentMsg msg="doesn’t have any public repositories yet." />
          </div>
        ) : (
          // Repo item
          repos.map((repo) => <RepoItem key={repo.id} repo={repo} />)
        )}
      </div>
    </>
  )
}

export default RepoList
