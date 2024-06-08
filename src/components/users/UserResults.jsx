import { useEffect, useState } from "react"

const UserResults = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch(`${import.meta.env.VITE_GITHUB_URL}/users`)

    const data = await response.json()

    setUsers(data)
    setLoading(false)
  }

  return <div>UserResults</div>
}

export default UserResults
