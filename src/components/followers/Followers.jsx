import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FaUserFriends } from "react-icons/fa"
import UserItem from "../users/UserItem"
import Spinner from "../layout/Spinner"
import GithubContext from "../../context/GithubContext"
import BackButton from "../layout/BackButton"
import NoContentMsg from "../layout/NoContentMsg"

const Followers = () => {
  const { userFollowers, getUserFollowers, loading } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getUserFollowers(params.login)
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
        {!loading && userFollowers.length === 0 ? (
          <div className="col-span-4">
            <NoContentMsg
              msg="doesn't have any followers yet."
              icon={<FaUserFriends />}
            />
          </div>
        ) : (
          userFollowers.map((follower) => (
            <UserItem key={follower.id} user={follower} />
          ))
        )}
      </div>
    </>
  )
}

export default Followers
