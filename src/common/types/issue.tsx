import ProjectText from "../../components/ProjectText/projectText"
import ProjectImage from "../../components/ProjectImage/projectImage"

export type Overview = {
  concept: string,
  participants: Array<string>,
}

export type Link = {
  displayName: string,
  href: string,
}

export type Content = 
{
  id: string,
  Component: typeof ProjectText | typeof ProjectImage,
  props: any,
}

export type Data = {
  path: string,
  title: string,
  displayTitle: string,
  author: string,
  content: Array<Content>,
  links: Array<Link>,
}

export type Issue = {
  name: string,
  overview: Overview,
  data: Data,
}
