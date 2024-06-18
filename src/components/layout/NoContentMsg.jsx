import PropTypes from "prop-types"
import { useParams } from "react-router-dom"

const NoContentMsg = ({ msg, icon = null }) => {
  const params = useParams()

  return (
    <div className="px-2 py-4 text-center">
      {icon && <div className="inline-block mb-2 text-4xl">{icon}</div>}
      <p className="text-xl font-medium">
        <span>{params.login}</span> {msg}
      </p>
    </div>
  )
}

NoContentMsg.propTypes = {
  msg: PropTypes.string,
  icon: PropTypes.element,
}

export default NoContentMsg
