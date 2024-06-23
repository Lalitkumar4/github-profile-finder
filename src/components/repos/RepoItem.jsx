import PropTypes from "prop-types"
import { FaCodeBranch, FaRegStar } from "react-icons/fa"
import { format } from "date-fns"

const languageColors = {
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Python: "#3572A5",
  PHP: "#4F5D95",
  TypeScript: "#2b7489",
  Ruby: "#701516",
  Vue: "#2c3e50",
  "Jupyter Notebook": "#DA5B0B",
  "C#": "#178600",
  "C++": "#f34b7d",
}

const RepoItem = ({ repo }) => {
  const {
    name,
    description,
    html_url,
    language,
    stargazers_count,
    forks,
    updated_at,
    visibility,
  } = repo

  const languageColor = languageColors[language] || "#cccccc"

  // format date
  const formatDate = (dateString) => {
    return format(dateString, "MMMM d, y")
  }

  // Add k if value is above 1000
  const formatValue = (value) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k"
    }
    return value
  }

  return (
    // Repo card
    <div className="p-4 my-4 bg-[#161B22] rounded-lg repo-card border border-gray-700">
      {/* Repo name */}
      <a
        href={html_url}
        target="_blank"
        rel="noreferrer"
        className="inline-block mb-1 mr-2 font-medium text-blue-500 text-md hover:underline"
      >
        {name}
      </a>

      {/* Repo visibility tag */}
      <p className="inline px-1 text-xs text-gray-300 border border-gray-400 rounded-full">
        {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
      </p>

      {/* Repo decs */}
      <p className="text-sm text-gray-400 max-h-fit">{description}</p>

      {/* Repo language */}
      <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
        {language && (
          <div className="flex items-center">
            <span
              className="w-3 h-3 mr-2 rounded-full"
              style={{ backgroundColor: languageColor }}
            ></span>
            {language}
          </div>
        )}

        {/* Repo stars count*/}
        <div className="flex items-center">
          <FaRegStar className="mr-1" />
          <p>{formatValue(stargazers_count)}</p>
        </div>

        {/* Repo forks count */}
        <div className="flex items-center">
          <FaCodeBranch />
          <p>{formatValue(forks)}</p>
        </div>

        {/* Repo updated date */}
        <div className="flex items-center repo-date">
          <p>Updated on {formatDate(updated_at)}</p>
        </div>
      </div>
    </div>
  )
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
}

export default RepoItem
