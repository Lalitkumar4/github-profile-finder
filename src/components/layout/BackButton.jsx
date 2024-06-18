import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(-1)} className="text-white">
      <FaArrowLeft />
    </button>
  )
}

export default BackButton
