import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import UserItem from "../users/UserItem"
import Spinner from "../layout/Spinner"
import GithubContext from "../../context/GithubContext"

const Following = () => {
  const { userFollowing, getUserFollowing, loading } = useContext(GithubContext)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getUserFollowing(params.login)
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
        {userFollowing.map((following) => (
          <UserItem key={following.id} user={following} />
        ))}
      </div>
    </>
  )
}

export default Following
