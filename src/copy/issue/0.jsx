import ProjectText from "../../components/ProjectText/projectText"
import ProjectImage from "../../components/ProjectImage/projectImage"

const basePath = '/issue/0'

export default {
  name: 'Issue 0',
  overview: {
    concept: 'We are always curious about how people express themselves. We invited seven different participants to showcase what it means to communicate between a group of seven people in nine days. Each recipient creates a prompt that passes to the next individual.',
    participants: ['Cindy Hsu', 'WCC', 'Helen Shu', 'Ty van De Zande', 'Jessica Tsai', 'Sharon Yu', 'Rhea Nayyar'],
  },
  data: {
    'Cindy Hsu': {
      id: 'object-of-attachment',
      path: `${basePath}/object-of-attachment`,
      title: 'Object of Attachment',
      displayTitle: 'INCINERATED!!!',
      author: 'Cindy Hsu',
      content: [
        { id: 'text', Component: ProjectText, props: { text: 'This is a dramatized portrayal of how it felt to be 25 yet still sad to hear that my mama threw away all my toys, my dear peach-fuzzed Calico Critter babies.' }, },
      ],
      links: [
        { displayName: 'Website', href: 'https://google.com' },
        { displayName: 'Instagram', href: 'https://instagram.com' },
      ],
    },
    'WCC': {
      id: 'loss-of-childhood',
      path: `${basePath}/loss-of-childhood`,
      title: 'Loss of Childhood',
          displayTitle: 'Breaking free from Control',
          author: 'Wei-Cheng Chung',
          content: [
             { id: 'text', Component: ProjectText, props: { text: 'Sometimes it strikes me realizing the similarity between the COVID situation and my childhood: to live without any other options but the long and dull waiting. Can’t imagine experiencing both of them at the same time.' }, },
          ],
          links: [
            { displayName: 'Website', href: 'https://google.com' },
            { displayName: 'Instagram', href: 'https://instagram.com' },
          ],
    },
    'Helen Shu': {
      id: 'routine-disruption-and-development',
      path: `${basePath}/routine-disruption-and-development`,
      title: 'Routine Disruption & Development',
          displayTitle: 'Recreational Buddhist Listens to Kanho Yakushiji 10 Times A Day',
          author: 'Helen Shu',
          content: [
            { id: 'text', Component: ProjectText, props: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }, },
          ],
          links: [
            { displayName: 'Website', href: 'https://google.com' },
            { displayName: 'Instagram', href: 'https://instagram.com' },
          ],
    },
    'Ty Van De Zande': {
      id: 'object-and-material',
      path: `${basePath}/object-and-material`,
      title: 'Object & Material',
          displayTitle: 'With Ya',
          author: 'Ty Van De Zande',
          content: [
            { id: 'text', Component: ProjectText, props: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }, },
          ],
          links: [
            { displayName: 'Website', href: 'https://google.com' },
            { displayName: 'Instagram', href: 'https://instagram.com' },
          ],
    },
    'Jessica Tsai': {
      id: 'comfort-food',
      path: `${basePath}/comfort-food`,
      title: 'Comfort Food',
          displayTitle: 'Be Our Guest',
          author: 'Jessica Tsai',
          content: [
            { id: 'text', Component: ProjectText, props: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' }, },
          ],
          links: [
            { displayName: 'Website', href: 'https://google.com' },
            { displayName: 'Instagram', href: 'https://instagram.com' },
          ],
    },
    'Sharon Yu': {
      id: 'favorite-water',
      path: `${basePath}/favorite-water`,
      title: 'Favorite Water',
          displayTitle: 'Rested on Water',
          author: 'Sharon Yu',
          content: [
            { id: 'text', Component: ProjectText, props: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' }, },
          ],
          links: [
            { displayName: 'Website', href: 'https://google.com' },
            { displayName: 'Instagram', href: 'https://instagram.com' },
          ],
    },
    'Rhea Nayyar': {
      id: 'the-heaviest-object',
      path: `${basePath}/the-heaviest-object`,
      title: 'The Heaviest Object',
          displayTitle: 'It Only Gets Different (For Allison)',
          author: 'Rhea Nayyar',
          content: [
            { id: 'text', Component: ProjectText, props: { text: 'This work approaches my journey through grief and guilt from a beloved friend’s untimely and tragic passing.' }, },
          ],
          links: [
            { displayName: 'Website', href: 'https://google.com' },
            { displayName: 'Instagram', href: 'https://instagram.com' },
          ],
    },
  }
}
