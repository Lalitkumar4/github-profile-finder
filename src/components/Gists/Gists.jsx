import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import Gist from "./Gist"
import Spinner from "../layout/Spinner"
import BackButton from "../layout/BackButton"
import NoContentMsg from "../layout/NoContentMsg"
import GithubContext from "../../context/GithubContext"

const Gists = () => {
  const { gists, getGists, loading } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getGists(params.login)
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
      {/* Gists grid layout */}
      <div className="grid grid-cols-1 gap-8 text-white xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
        {/* No content message */}
        {!loading && gists.length === 0 ? (
          <div className="col-span-4">
            <NoContentMsg msg={"doesn't have any public gists yet."} />
          </div>
        ) : (
          // Gist item
          gists.map((gist) => <Gist key={gist.id} gist={gist} />)
        )}
      </div>
    </>
  )
}

export default Gists
