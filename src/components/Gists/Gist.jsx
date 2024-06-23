import { format } from "date-fns"
import PropTypes from "prop-types"

const Gist = ({ gist }) => {
  // formate date
  const formatDate = (dateString) => {
    return format(dateString, "MMMM d, y")
  }

  return (
    // Gist card
    <div className="p-4 bg-[#161B22] rounded-lg repo-card border border-gray-700 break-all">
      {/* Gist name */}
      <a
        href={gist.html_url}
        target="_blank"
        rel="noreferrer"
        className="inline-block mb-1 mr-2 font-medium text-blue-500 texst-md hover:underline"
      >
        {Object.keys(gist.files)[0]}
      </a>

      {/* Gist public tag */}
      <p className="inline px-1 text-xs text-gray-300 border border-gray-400 rounded-full">
        {gist.public ? "Public" : "Private"}
      </p>

      {/* Gist desc */}
      <p className="text-sm text-gray-400 max-h-fit">{gist.description}</p>

      {/* Gist updated date */}
      <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
        <div className="flex items-center date">
          <p>Updated on {formatDate(gist.updated_at)}</p>
        </div>
      </div>
    </div>
  )
}

Gist.propTypes = {
  gist: PropTypes.object.isRequired,
}

export default Gist
