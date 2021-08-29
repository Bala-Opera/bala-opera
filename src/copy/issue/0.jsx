import ProjectText from "../../components/ProjectText/projectText"
import ProjectImage from "../../components/ProjectImage/projectImage"

export default { // 152 sides, 185 top ; center text
  name: 'Issue 0',
  overview: {
    concept: 'We are always curious about how people express themselves. We invited seven different participants to showcase what it means to communicate between a group of seven people in nine days. Each recipient creates a prompt that passes to the next individual.',
    participants: ['Cindy Hsu', 'WCC', 'Helen Shu', 'Ty van De Zande', 'Jessica Tsai', 'Sharon Yu', 'Rhea Nayyar'],
  },
  data: {
    'Cindy Hsu': {
      path: '/issue/0/object-of-attachment',
      title: 'Object of Attachment',
      displayTitle: 'INCINERATED!!!',
      author: 'Cindy Hsu',
      content: [
        { id: 'text', Component: ProjectText, props: { text: 'This is a dramatized portrayal of how it felt to be 25 yet still sad to hear that my mama threw away all my toys, my dear peach-fuzzed Calico Critter babies.' }, },
        { id: 'image', Component: ProjectImage, props: { src: '/images/test.png', width: 1168, height: 730 }},
      ],
      links: [
        { displayName: 'Website', href: 'https://google.com' },
        { displayName: 'Instagram', href: 'https://instagram.com' },
      ],
    },
    'WCC': {
      title: 'Loss of Childhood',
    },
    'Helen Shu': {
      title: 'Routine Disruption & Development',
    },
    'Ty Van De Zande': {
      title: 'Object & Material',
    },
    'Jessica Tsai': {
      title: 'Comfort Food',
    },
    'Sharon Yu': {
      title: 'Favorite Water',
    },
    'Rhea Nayyar': {
      title: 'The Heaviest Object',
    },
  }
}
