import { useContext } from "react"
import UserItem from "./UserItem"
import GithubImg from "../layout/GithubImg"
import SearchNotFind from "../layout/SearchNotFind"
import Spinner from "../layout/Spinner"
import GithubContext from "../../context/GithubContext"

const UserResults = () => {
  const { users, loading, searched } = useContext(GithubContext)

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 mt-16 text-white xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
        {!loading && users.length === 0 && !searched ? (
          <div className="col-span-3 m-auto text-center">
            <SearchNotFind />
          </div>
        ) : !loading && users.length === 0 && searched ? (
          <div className="col-span-3 mx-auto mt-5">
            <GithubImg />
          </div>
        ) : (
          users.map((user) => <UserItem key={user.id} user={user} />)
        )}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserResults
