import ProjectText from "../../components/ProjectText/projectText"
import ProjectImage from "../../components/ProjectImage/projectImage"
import ProjectVideo from "../../components/ProjectVideo/projectVideo"
import FavoriteWaterEssay from "./FavoriteWaterEssay"

import { bucket } from "../../config/server"
import ProjectSpace from "../../components/ProjectSpace/projectSpace"

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
        { id: 'text', Component: ProjectText, props: { customStyles: { margin: '160px 0' }, text: 'This is a dramatized portrayal of how it felt to be 25 yet still sad to hear that my mama threw away all my toys, my dear peach-fuzzed Calico Critter babies.' }, },
        { Component: ProjectVideo, props: { src: `${bucket}/videos/issue/0/cindy.mp4`, type: 'video/mp4' }},
      ],
      links: [
        { displayName: 'Website', href: 'http://ogskinman.com/' },
        { displayName: 'Instagram', href: 'https://www.instagram.com/og.skinman/' },
      ],
    },
    'WCC': {
      id: 'loss-of-childhood',
      path: `${basePath}/loss-of-childhood`,
      title: 'Loss of Childhood',
          displayTitle: 'Breaking free from Control',
          author: 'Wei-Cheng Chung',
          content: [
             { id: 'text', Component: ProjectText, props: { customStyles: { margin: '160px 0' }, text: 'Sometimes it strikes me realizing the similarity between the COVID situation and my childhood: to live without any other options but the long and dull waiting. Can’t imagine experiencing both of them at the same time.' }, },
             { Component: ProjectVideo, props: { customStyles: { width: '60%' }, src: `${bucket}/videos/issue/0/wcc.mp4`, type: 'video/mp4' }},
          ],
          links: [
            { displayName: 'Website', href: 'https://wccsnapshots.com' },
            { displayName: 'Instagram', href: 'https://www.instagram.com/weicchung/?utm_medium=copy_link' },
          ],
    },
    'Helen Shu': {
      id: 'routine-disruption-and-development',
      path: `${basePath}/routine-disruption-and-development`,
      title: 'Routine Disruption & Development',
          displayTitle: 'Recreational Buddhist Listens to Kanho Yakushiji 10 Times A Day',
          author: 'Helen Shu',
          content: [
            { id: 'image', Component: ProjectImage, props: { customStyles: { margin: '160px auto' }, src: `${bucket}/images/issues/0/helen.jpeg` }, },
          ],
          links: [
            { displayName: 'Website', href: 'https://www.shuhelen.com/' },
            { displayName: 'Instagram', href: 'https://www.instagram.com/suspiciousasianwoman/' },
          ],
    },
    'Ty Van De Zande': {
      id: 'object-and-material',
      path: `${basePath}/object-and-material`,
      title: 'Object & Material',
          displayTitle: 'With Ya',
          author: 'Ty Van De Zande',
          content: [
            { id: 'image', Component: ProjectImage, props: { customStyles: { margin: '160px auto' }, src: `${bucket}/images/issues/0/ty.png`, } },
          ],
          links: [
            { displayName: 'Website', href: 'https://www.bliss.moda/' },
            { displayName: 'Instagram', href: 'https://www.instagram.com/segel.bliss/' },
          ],
    },
    'Jessica Tsai': {
      id: 'comfort-food',
      path: `${basePath}/comfort-food`,
      title: 'Comfort Food',
          displayTitle: 'Be Our Guest',
          author: 'Jessica Tsai',
          content: [
            { id: 'space', Component: ProjectSpace },
            { id: 'image-1', Component: ProjectImage, props: { src: `${bucket}/images/issues/0/jessica-1.jpg`, }, },
            { id: 'image-2', Component: ProjectImage, props: { src: `${bucket}/images/issues/0/jessica-2.jpg`, }, },
            { id: 'image-3', Component: ProjectImage, props: { src: `${bucket}/images/issues/0/jessica-3.jpg`, }, },
            { id: 'image-4', Component: ProjectImage, props: { src: `${bucket}/images/issues/0/jessica-4.jpg`, }, },
          ],
          links: [
            { displayName: 'Website', href: 'https://www.thejcwt.com/' },
            { displayName: 'Instagram', href: 'https://www.instagram.com/jcwtthe/' },
          ],
    },
    'Sharon Yu': {
      id: 'favorite-water',
      path: `${basePath}/favorite-water`,
      title: 'Favorite Water',
          displayTitle: 'Rested on Water',
          author: 'Sharon Yu',
          content: [
            { id: 'space', Component: ProjectSpace },
            { id: 'essay', Component: FavoriteWaterEssay },
            // { id: 'image-1', Component: ProjectImage, props: { src: `${bucket}/images/issues/0/sharon-1.png`, }, },
            // { id: 'image-2', Component: ProjectImage, props: { src: `${bucket}/images/issues/0/sharon-2.png`, }, },
          ],
          links: [
            { displayName: 'Website', href: 'http://www.sharonyu.com/' },
            { displayName: 'Instagram', href: 'https://www.instagram.com/_sharonyu/' },
          ],
    },
    'Rhea Nayyar': {
      id: 'the-heaviest-object',
      path: `${basePath}/the-heaviest-object`,
      title: 'The Heaviest Object',
          displayTitle: 'It Only Gets Different (For Allison)',
          author: 'Rhea Nayyar',
          content: [
            { id: 'space', Component: ProjectSpace },
            { id: 'image-1', Component: ProjectImage, props: { src: `${bucket}/images/issues/0/rhea-1.jpg`, }, },
            { id: 'image-2', Component: ProjectImage, props: { src: `${bucket}/images/issues/0/rhea-2.jpg`, }, },
          ],
          links: [
            { displayName: 'Website', href: 'https://www.rhea-nayyar.com/' },
            { displayName: 'Instagram', href: 'https://www.instagram.com/sicksadshawty/' },
          ],
    },
  }
}
