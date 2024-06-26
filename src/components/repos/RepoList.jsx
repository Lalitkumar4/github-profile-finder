import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import RepoItem from "./RepoItem"
import Spinner from "../layout/Spinner"
import BackButton from "../layout/BackButton"
import NoContentMsg from "../layout/NoContentMsg"
import PaginationButtons from "../layout/PaginationButtons"
import GithubContext from "../../context/GithubContext"

const RepoList = () => {
  const { getUser, getUserRepos, repos, loading, currentPage } =
    useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    // getUser completes before getUserFollowers is called
    const fetchUserData = async () => {
      await getUser(params.login)
      getUserRepos(params.login)
    }

    fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      {/* Back button */}
      <div className="mb-4">
        <BackButton type="repos" />
      </div>
      <div>
        {/* No content message */}
        {!loading && repos.length === 0 ? (
          <div className="text-center text-white">
            <NoContentMsg msg="doesn’t have any public repositories yet." />
          </div>
        ) : (
          <>
            {/* Repo item */}
            {repos.map((repo) => (
              <RepoItem key={repo.id} repo={repo} />
            ))}

            {/* Paginate buttons  */}
            {(repos.length >= 30 || currentPage !== 1) && (
              <div className="col-span-full">
                <PaginationButtons type="repos" />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default RepoList
