import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import Gist from "./Gist"
import Spinner from "../layout/Spinner"
import GithubContext from "../../context/GithubContext"
import BackButton from "../layout/BackButton"
import NoContentMsg from "../layout/NoContentMsg"

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
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="grid grid-cols-1 gap-8 text-white xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {gists.length > 0 ? (
          gists.map((gist) => <Gist key={gist.id} gist={gist} />)
        ) : (
          <div className="col-span-4">
            <NoContentMsg msg={"doesn't have any public gists yet."} />
          </div>
        )}
      </div>
    </>
  )
}

export default Gists
