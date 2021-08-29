import Project from '../../../components/Project/project'
import Issue_0 from '../../../copy/issue/0'

export default function Page({ id } : { id: string }) {
  let previousProject = null
  let nextProject = null
  const projectKeys = Object.keys(Issue_0.data)
  const index = projectKeys.indexOf(id)

  if (index - 1 >= 0) {
    const previousProjectKey = projectKeys[index - 1]
    const { path, title } = Issue_0.data[previousProjectKey]
    previousProject = { href: path, displayName: title }
  }
  if (index + 1 < projectKeys.length) {
    const nextProjectKey = projectKeys[index + 1]
    const { path, title } = Issue_0.data[nextProjectKey]
    nextProject = { href: path, displayName: title }
  }

  return (
    <Project
      issueId="0"
      data={Issue_0.data[id]}
      previousProject={previousProject}
      nextProject={nextProject}
    />
  )
}

export async function getStaticPaths() {
  const keys = Object.values(Issue_0.data).map(({ id }) => id)
  const paths = keys.map((key) => ({
    params: { id: key },
  }))
  return { paths, fallback: false }
}

const extractDataKey = (id, data) => (
  Object.keys(data).find((dataKey) => id === data[dataKey].id))

export async function getStaticProps({ params }) {
  const dataKey = extractDataKey(params.id, Issue_0.data)
  return { props: { id: dataKey } }
}