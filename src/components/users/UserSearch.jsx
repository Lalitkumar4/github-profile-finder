import { useContext, useState } from "react"
import { FaGithub, FaTimes } from "react-icons/fa"
import GithubContext from "../../context/GithubContext"

const UserSearch = () => {
  const [text, setText] = useState("")

  const { searchUsers } = useContext(GithubContext)

  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text.trim().length === 0) {
      return
    } else {
      searchUsers(text)

      setText("")
    }
  }

  return (
    <div className="sticky top-0 z-10 pt-4">
      <form onSubmit={handleSubmit}>
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
            autoFocus
            value={text}
            onChange={handleChange}
          />
          {text.trim().length > 0 && (
            <div className="absolute cursor-pointer right-2 top-3">
              <FaTimes className="text-gray-500" onClick={() => setText("")} />
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default UserSearch
