import PropTypes from "prop-types"

const Slider = ({ repo }) => {
  return <div>{repo.name}</div>
}

Slider.propTypes = {
  repo: PropTypes.object.isRequired,
}

export default Slider
