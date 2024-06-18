import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FaUserFriends } from "react-icons/fa"
import UserItem from "../users/UserItem"
import Spinner from "../layout/Spinner"
import GithubContext from "../../context/GithubContext"
import BackButton from "../layout/BackButton"
import NoContentMsg from "../layout/NoContentMsg"

const Following = () => {
  const { userFollowing, getUserFollowing, loading } = useContext(GithubContext)

  const params = useParams()

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
        <BackButton />
      </div>
      <div className="grid grid-cols-1 gap-8 text-white xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {userFollowing.length > 0 ? (
          userFollowing.map((following) => (
            <UserItem key={following.id} user={following} />
          ))
        ) : (
          <div className="col-span-4">
            <NoContentMsg
              msg="isn't following anybody."
              icon={<FaUserFriends />}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Following
