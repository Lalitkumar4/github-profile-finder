import React, { useContext } from "react"
import { format } from "date-fns"
import GitHubCalendar from "react-github-calendar"
import { Tooltip } from "react-tooltip"

import "react-tooltip/dist/react-tooltip.css"
import GithubContext from "../../context/GithubContext"

const GitHubContributionsCalendar = () => {
  const { user } = useContext(GithubContext)

  // format date
  const formatDate = (dateString) => {
    return format(dateString, "MMMM d, y")
  }

  return (
    <div>
      <GitHubCalendar
        username={user.login}
        showWeekdayLabels
        renderBlock={(block, activity) =>
          React.cloneElement(block, {
            "data-tooltip-id": "react-tooltip",
            "data-tooltip-html": `${
              activity.count
            } contributions on ${formatDate(activity.date)}`,
          })
        }
      />
      <Tooltip id="react-tooltip" />
    </div>
  )
}

export default GitHubContributionsCalendar
