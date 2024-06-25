import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FaUserFriends } from "react-icons/fa"
import UserItem from "../users/UserItem"
import Spinner from "../layout/Spinner"
import BackButton from "../layout/BackButton"
import NoContentMsg from "../layout/NoContentMsg"
import GithubContext from "../../context/GithubContext"
import PaginationButtons from "../layout/PaginationButtons"

const Followers = () => {
  const { userFollowers, getUserFollowers, getUser, loading } =
    useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    // getUser completes before getUserFollowers is called
    const fetchUserData = async () => {
      await getUser(params.login)
      getUserFollowers(params.login)
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
        <BackButton type="followers" />
      </div>
      <div className="grid grid-cols-1 gap-8 text-white xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
        {/* No content message */}
        {!loading && userFollowers.length === 0 ? (
          <div className="col-span-4">
            <NoContentMsg
              msg="doesn't have any followers yet."
              icon={<FaUserFriends />}
            />
          </div>
        ) : (
          <>
            {/* User item for followers */}
            {userFollowers.map((follower) => (
              <UserItem key={follower.id} user={follower} />
            ))}

            {/* Paginate buttons  */}
            {userFollowers.length >= 30 && (
              <div className="col-span-full">
                <PaginationButtons type="followers" />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Followers
