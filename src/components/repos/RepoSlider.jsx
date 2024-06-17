import PropTypes from "prop-types"
import Slider from "./Slider"

const RepoSlider = ({ repos }) => {
  return (
    <div>
      <h2 className="mb-3 text-sm text-gray-200">Latest Repository</h2>
      {repos.map((repo) => (
        <Slider key={repo.id} repo={repo} />
      ))}
    </div>
  )
}

RepoSlider.propTypes = {
  repos: PropTypes.object.isRequired,
}

export default RepoSlider
