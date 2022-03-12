import Project from "../../components/Project/project"

import { Issue } from "../../common/types/issue"

export default function Page({ issueId, projectId, issue } : {
  issueId: string,
  projectId: string,
  issue: Issue,
}) {
  let previousProject = null
  let nextProject = null
  const projectKeys = Object.keys(issue.data)
  const index = projectKeys.indexOf(projectId)

  if (index - 1 >= 0) {
    const previousProjectKey = projectKeys[index - 1]
    const { path, title } = issue.data[previousProjectKey]
    previousProject = { href: path, displayName: title }
  }
  if (index + 1 < projectKeys.length) {
    const nextProjectKey = projectKeys[index + 1]
    const { path, title } = issue.data[nextProjectKey]
    nextProject = { href: path, displayName: title }
  }

  return (
    <Project
      issueId={issueId}
      data={issue.data[projectId]}
      previousProject={previousProject}
      nextProject={nextProject}
    />
  )
}
