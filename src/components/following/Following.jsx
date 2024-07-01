import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FaUserFriends } from "react-icons/fa"
import UserItem from "../users/UserItem"
import Spinner from "../layout/Spinner"
import BackButton from "../layout/BackButton"
import NoContentMsg from "../layout/NoContentMsg"
import PaginationButtons from "../layout/PaginationButtons"
import Error from "../layout/Error"
import GithubContext from "../../context/GithubContext"

const Following = () => {
  const {
    getUser,
    getUserFollowing,
    userFollowing,
    loading,
    currentPage,
    error,
  } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    // getUser completes before getUserFollowers is called
    const fetchUserData = async () => {
      await getUser(params.login)
      getUserFollowing(params.login)
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
        <BackButton type="following" />
      </div>
      <div className="grid grid-cols-1 gap-8 text-white xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
        {/* No content message */}
        {!loading && userFollowing.length === 0 ? (
          <div className="col-span-4">
            <NoContentMsg
              msg="isn't following anybody."
              icon={<FaUserFriends />}
            />
          </div>
        ) : (
          <>
            {/* User item for following */}
            {userFollowing.map((following) => (
              <UserItem key={following.id} user={following} />
            ))}

            {/* Paginate buttons  */}
            {(userFollowing.length >= 30 || currentPage !== 1) && (
              <div className="col-span-full">
                <PaginationButtons type="following" />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Following
