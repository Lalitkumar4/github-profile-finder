import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import Gist from "./Gist"
import Spinner from "../layout/Spinner"
import GithubContext from "../../context/GithubContext"

const Gists = () => {
  const { gists, getGists, loading } = useContext(GithubContext)

  const params = useParams()
  const navigate = useNavigate()

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
        <button onClick={() => navigate(-1)} className="text-white">
          <FaArrowLeft />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-8 text-white xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {gists.map((gist) => (
          <Gist key={gist.id} gist={gist} />
        ))}
      </div>
    </>
  )
}

export default Gists
