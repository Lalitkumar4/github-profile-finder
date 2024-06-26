import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import Gist from "./Gist"
import Spinner from "../layout/Spinner"
import BackButton from "../layout/BackButton"
import NoContentMsg from "../layout/NoContentMsg"
import PaginationButtons from "../layout/PaginationButtons"
import Error from "../layout/Error"
import GithubContext from "../../context/GithubContext"

const Gists = () => {
  const { getUser, gists, getUserGists, loading, currentPage, error } =
    useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    // getUser completes before getUserFollowers is called
    const fetchUserData = async () => {
      await getUser(params.login)
      getUserGists(params.login)
    }

    fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (error.status !== null || error.message !== null) {
    return <Error />
  }

  return (
    <>
      {/* Back button */}
      <div className="mb-4">
        <BackButton type="gists" />
      </div>
      {/* Gists grid layout */}
      <div className="grid grid-cols-1 gap-8 text-white xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
        {/* No content message */}
        {!loading && gists.length === 0 ? (
          <div className="col-span-4">
            <NoContentMsg msg={"doesn't have any public gists yet."} />
          </div>
        ) : (
          <>
            {/* Gist item */}
            {gists.map((gist) => (
              <Gist key={gist.id} gist={gist} />
            ))}

            {/* Paginate buttons  */}
            {(gists.length >= 30 || currentPage !== 1) && (
              <div className="col-span-full">
                <PaginationButtons type="gists" />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Gists
