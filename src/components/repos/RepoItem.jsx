import PropTypes from "prop-types"
import { FaRegStar } from "react-icons/fa"
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

  const formatDate = (dateString) => {
    return format(dateString, "MMMM d, y")
  }

  return (
    <div className="p-4 my-4 bg-[#161B22] rounded-lg repo-card border border-gray-700">
      <a
        href={html_url}
        target="_blank"
        rel="noreferrer"
        className="inline-block mb-1 mr-2 font-medium text-blue-500 text-md hover:underline"
      >
        {name}
      </a>
      <p className="inline px-1 text-xs text-gray-300 border border-gray-400 rounded-full">
        {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
      </p>
      <p className="text-sm text-gray-400 max-h-fit">{description}</p>
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
        <div className="flex items-center">
          <FaRegStar className="mr-1" />
          <p>{stargazers_count}</p>
        </div>
        <div className="flex items-center">
          <svg
            fill="#cccccccc"
            aria-label="fork"
            role="img"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            className="mr-1 octicon octicon-repo-forked"
          >
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
          </svg>
          <p>{forks}</p>
        </div>
        <div className="flex items-center date">
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
