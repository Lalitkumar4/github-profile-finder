import { FaGithub } from "react-icons/fa"
import { FaTimes } from "react-icons/fa"

const UserSearch = () => {
  return (
    <div>
      <form>
        <div className="relative flex mx-auto xl:w-3/4">
          <div className="flex input-left-side">
            <div className="p-2 bg-gray-200 rounded-s-md">
              <FaGithub className="text-2xl text-gray-600" />
            </div>
            <p className="flex items-center pr-2 text-gray-500 bg-gray-200 ">
              Username
            </p>
          </div>
          <input
            type="text"
            className="w-full p-2 outline-none rounded-e-md"
            placeholder="Github Username..."
          />
          <div className="absolute right-2 top-3">
            <FaTimes className="text-gray-500" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserSearch
