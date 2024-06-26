import { useContext } from "react"
import UserItem from "./UserItem"
import GithubImg from "../layout/GithubImg"
import SearchNotFind from "../layout/SearchNotFind"
import Spinner from "../layout/Spinner"
import PaginationButtons from "../layout/PaginationButtons"
import Error from "../layout/Error"
import GithubContext from "../../context/GithubContext"

const UserResults = () => {
  const { users, loading, searched, currentPage, error } =
    useContext(GithubContext)

  if (error.status !== null || error.message !== null) {
    return <Error />
  }

  if (loading) {
    return <Spinner />
  }

  return (
    // Users Grid layout
    <div className="grid grid-cols-1 gap-8 mt-16 text-white xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
      {/* Search not find message */}
      {!loading && users.length === 0 && !searched ? (
        <div className="col-span-3 m-auto text-center">
          <SearchNotFind />
        </div>
      ) : !loading && users.length === 0 && searched ? (
        // Github image
        <div className="col-span-3 mx-auto mt-5">
          <GithubImg />
        </div>
      ) : (
        <>
          {/* User item */}
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}

          {/* Paginate buttons  */}
          {(users.length >= 30 || currentPage !== 1) && (
            <div className="col-span-full">
              <PaginationButtons type="users" />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default UserResults
