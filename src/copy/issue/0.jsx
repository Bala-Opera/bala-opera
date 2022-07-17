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
    concept: 'Every piece produced in this issue was created through an exercise of telephone, or chain letters, if you will. The first participant was given a randomly generated topic, a set of instructions, and 9 days to create a piece based on that topic. There were no constraints in medium. Once they had finished, they were asked to distill their experience into a topic to pass to the next participant, and so on and so forth. ',
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
        { id: 'space-1', Component: ProjectSpace },
        { id: 'text', Component: ProjectText, props: { text: 'I was given the generated topic "Object of Attachment." In response, I created a horror non-game to express how it felt to be an adult yet extremely anguished to hear that my mother had thrown away my beloved toys while clearing out our moldy childhood home to put up for sale. My response is dramatic, but fitting, as my inner child was throwing a tantrum. Rest in peace, my dear peach-fuzzed Calico Critters.' }, },
        { id: 'space-2', Component: ProjectSpace },
        { id: 'video', Component: ProjectVideo, props: { videoId: 706378261, height: 900 } },
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
        { id: 'space-1', Component: ProjectSpace },
        { id: 'text', Component: ProjectText, props: { text: 'Sometimes it strikes me realizing the similarity between the COVID situation and my childhood: to live without any other options but the long and dull waiting. Can’t imagine experiencing both of them at the same time.' }, },
        { id: 'space-2', Component: ProjectSpace },
        { id: 'video', Component: ProjectVideo, props: { videoId: 706376278, height: 900 } },
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
        { id: 'space-1', Component: ProjectSpace },
        {
          id: 'image', Component: ProjectImage, props: {
            priority: true,
            dimensions: { width: 2625, height: 3930 },
            src: `${bucket}/images/issues/0/helen.jpeg`,
            blurDataURL: 'data:image/jpeg;base64,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'
          },
        },
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
        { id: 'space-1', Component: ProjectSpace },
        {
          id: 'image', Component: ProjectImage, props: {
            priority: true,
            dimensions: { width: 1200, height: 1200 },
            src: `${bucket}/images/issues/0/ty.png`,
            blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAC4jAAAuIwF4pT92AAABx0lEQVQYlQG8AUP+AP/Wuf/00f/rxP/nvv/ctf/NqP/Xov/3sf/9sP/rn//4qv/anQD/xpD/y4/5t3v/3qj/1qH/z5j/1ZH/1JT/4pX/247/1Yf2sGgA/8V++bBt655Q/75/+rl38bN3/8h79sl4/8hw/9p5/9V/8ahXAP/Jhfesa+eZT//AhP/LlPa2iPrAiv/UkP/Gfv/Bffu5d+2cTwDypWf2rHb2qnL7s3z2q2z/uYH+vHnzs3bmoWTypWrqmWbUdz8A4olR8ap+2Jx3pmpIyoBO55Na45Zf7p1i5ItV03BF2X1Yy2I4ANySZdSedYpuVVpfXJuDbZ12VaBpUYFRP61jSbllSb5oSclmOgDRlGych2tVVlFEX5QCOVQyQ0lsaFc/MShnSTi0bEyqUiuqSSoAkmVBUFVNASM5ACZDABw2ADVJOVt1KTdLPEZJZko3nlAoqkwsACMbFllJQWU9AAARIwA1TAA4TAAaKQArSzkzPBcYEXo9IrxYMQAmKiqzQAubAABlSwkAIiwERSYAJic9IwChFwB5OABCJRyGOSUAnXU+rzcAvkwovlQAKDUEAEIxHlYBtkUApycAoRcAhVAAXToRH4jbsSJUndoAAAAASUVORK5CYII='
          }
        },
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
        {
          id: 'image-1', Component: ProjectImage, props: {
            priority: true,
            dimensions: { width: 5174, height: 3454 },
            width: '100%',
            src: `${bucket}/images/issues/0/jessica-1.jpg`,
            blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAVACADASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAgDBQYE/8QALRAAAQMDAgIIBwAAAAAAAAAAAQIDBAAFEQYxElEIExQhQVJhgSIjcZGhscH/xAAWAQEBAQAAAAAAAAAAAAAAAAAEAQL/xAAbEQEAAwEAAwAAAAAAAAAAAAABAAIDEQQhMf/aAAwDAQACEQMRAD8AZwpWNpKs+qEn+VC8pbKSp2SlCeamwkfk1V6why5mm7pGtsh2PNcjqDTra+BSVbjCvDOMe9JDrlV6auRi31dz6xruxLdWkk+Jwrej6XaJ6icMTX68jnXfU9khOBEzUMVpXlDrfPHqa6orkSawH4kwSmjstD3Gk/bupA47KHHVpU44gb/Asd59qYzouxQGb3IS9IVhLTQb4vlYyTxY8/hnlUpoqE3r45SqkYd4lSSOJQ+hxVJd4jU5rqZjbMhobIeaS4B7EUUUnhB9mZf0bp51wFyyWpR59kQP0K0+nrfFtkXs9vjR4rBOS2y0EJzzwKKKla1HoTTeycWf/9k='
          },
        },
        { id: 'space-1', Component: ProjectSpace, props: { heights: { lg: 150, md: 60, sm: 40 }} },
        {
          id: 'image-2', Component: ProjectImage, props: {
            dimensions: { width: 4381, height: 2925 },
            width: '100%',
            src: `${bucket}/images/issues/0/jessica-2.jpg`,
            blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAWACADASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAAcFBgECBAj/xAAqEAABAwMCBQQCAwAAAAAAAAABAgMEAAURBjESEyFBYRQiUXEHMiOBwf/EABgBAAIDAAAAAAAAAAAAAAAAAAIDAAQF/8QAIxEAAgIABAcBAAAAAAAAAAAAAQIAAwQRITEFEhMiQVGB8P/aAAwDAQACEQMRAD8AcOoNY2OzSENXy6xGFqGeSpeVJB2JSASB5NVLTuvbLqG9OW2C45zwOJHtwHB16Jzucdfr6rH5n05GjMi/BDm3p3SgZCSeiVqGOoGACO/ekXbLA9b5qnLTcoZLRDiCVKCmVZz++Pae9Y+KxPSbls/fY9Ky3cNBPVtiu0aVGnIRGmsTIYJdYcSc7ZTwn9TxdvvtXLo7VkPUkfnIL7LyVFDjDisLbUNxjY/1UXo27XPU+kX1uOOwLuxloTOWFtrJHRWNj5Hbf4rXRECfJ9avV0S3tXRp7+J6K37nE9ffkbeO/wA1YS0OqtXsYoq4OviXq9QGLpapUCWniYktqbWPBG/+0kLR+MVXdht+5TUICONvjZSS4cKwFAnGD087miig4hUj2Vlh7j6HKqcjGfpyxRbDB9LCW+WyQVF1wqKj8ntU0gUUVK1CjIbQp//Z'
          },
        },
        { id: 'space-2', Component: ProjectSpace, props: { heights: { lg: 150, md: 60, sm: 40 }} },
        {
          id: 'image-3', Component: ProjectImage, props: {
            dimensions: { width: 4810, height: 3211 },
            width: '100%',
            src: `${bucket}/images/issues/0/jessica-3.jpg`,
            blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAWACADASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAMEBQYH/8QAJRAAAgEEAQMEAwAAAAAAAAAAAQIDAAQFESEGEkETYXGBIzGR/8QAFwEBAQEBAAAAAAAAAAAAAAAAAwQGB//EACMRAAICAQMDBQAAAAAAAAAAAAECABEDBBJRBRTBITGBodH/2gAMAwEAAhEDEQA/ANVZ9U4rG495bl3UjhUCktI3gLScb1F1fkbZLqLpZILdh3+nLPqQLv62deNVKltIciIr22sVubbHfmeNSOGPCt8jn+1pcPkTdTxJFHuJl2x7CCvsd+a5E+3Gu7ZZPN/VVNI4d2NNQHEssavr2kMzQyQvIgYxyDTIfIPuKsmhBtl48Uq2ViWdwByQACSNfdSS4EWjS9Ecd0RyD4Mm1BJX1nOpOl8lb4p4OnMolpMx2Xmj7gf1zoaBPHBI4pmJwPWEErNJn7V0bW+6Lu18cDVFFTLmZkN0fgfkXUKCb8mbTG2V7DCVvrxJ5Cd9yR9mvbWzUqW2codPzrzRRUeHM+PKHQ0YR9qn/9k='
          },
        },
        { id: 'space-3', Component: ProjectSpace, props: { heights: { lg: 150, md: 60, sm: 40 }} },
        {
          id: 'image-4', Component: ProjectImage, props: {
            dimensions: { width: 4735, height: 3161 },
            width: '100%',
            src: `${bucket}/images/issues/0/jessica-4.jpg`,
            blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAVACADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABgAHA//EACkQAAEDBAEDBAEFAAAAAAAAAAECAwQABQYRIRIxQRMiMnFhBxQjUfD/xAAXAQADAQAAAAAAAAAAAAAAAAABAgQD/8QAHhEAAgMAAgMBAAAAAAAAAAAAAQIAAxExQQQhYfD/2gAMAwEAAhEDEQA/ANkx1oITJlOH3OHSSfIH+3R7McgyGBc4wxqxsXFIZU446/KS0k6J2hPPy87PFcJt0cfZ9JuI6gJ7qUFb1+B4opktzlwsKuv7tmM+wptTIdaT0O/yKCdnXBIBJ0O5H5rOzQpMZVLkKO4hxHOXMjv8a23i2LtNyQ4VpbUvrbkAD5IUOD58n7rVZyEyJbDZG9JOvvvWX4bZEzrHYJJlOiXFfU6l11v0FqQNBSenjXtHbz3rT2D1vtvj4+px9EcVN4dr3VB3HPv9xCyGtih6hSESEFKdJSRogDuP6NA73+lDt1uEySjKLkyzIcSoxigLbToggBOwNAgEccVVVUVDDDEzY5xPDZ9tYQmZkcm4MfMtuxmwSdc+7vTVOkggDzVVQStalCoMEP0z/9k='
          },
        },
        { id: 'space-4', Component: ProjectSpace, props: { heights: { lg: 150, md: 60, sm: 40 }} },
        {
          id: 'image-5', Component: ProjectImage, props: {
            dimensions: { width: 4227, height: 2822 },
            width: '100%',
            src: `${bucket}/images/issues/0/jessica-5.jpg`,
            blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAVACADASIAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAAAAUGCAIEB//EACYQAAIBBAEEAQUBAAAAAAAAAAECAwAEBREhBhIxQSIVFlFxgWH/xAAYAQACAwAAAAAAAAAAAAAAAAADBQABBv/EABwRAAICAwEBAAAAAAAAAAAAAAECACEDERIEMf/aAAwDAQACEQMRAD8A0ul+n+rD0JbR/b11LZMGYoV7Z2U9vHaxBPgevzUSuMbkcZlrPF3WNu7LMtIhRJJu1mJPxZWI1r/d8e6udeKttC0jkaH93SDMpa5nDy2t3G8YkGgwXZHO+D6pbn8aao3A8dfJXbH4zqY2UkEJlku0Z1kVboMyS+SGcfHZUjXPOqadMw5vGXq/WrOWa3SJRprguVOh5UD9+/ddGs8Fh8Kk6wJoSyCVwigF2Hs/n+06xOIx+XiZpgyTb7dq2uPQpanm7bRqHXEFWjuTK0BuZAZyXG+AfFMJbeOSMoVAUjXAoorQpdmRhQiK66ZtZHZjI/6rOxwMFptoZGDboooRwJ1vUsMQKn//2Q=='
          },
        },
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
        { id: 'space-1', Component: ProjectSpace },
        { id: 'text', Component: ProjectText, props: { text: 'The first thing that came to mind when Jessica gave me the prompt “Favorite Water” was: I’ll write about men crying. I had been stuck at home with my parents for 6 months at that point and had torn through all the Josei manga on the internet I could get my hands on. Something about seeing men being vulnerable made it easier to come to terms with my situation. I pitched the idea to Jessica, along with my second idea of writing a research paper about the water temple turned open market in Tainan. Jessica suggested I explore the crying men idea. I didn’t.' }, },
        { id: 'space-2', Component: ProjectSpace },
        { id: 'essay', Component: FavoriteWaterEssay },
        { id: 'space-3', Component: ProjectSpace },
        {
          id: 'image', Component: ProjectImage, props: {
            priority: true,
            dimensions: { width: 675, height: 900 },
            src: `${bucket}/images/issues/0/sharon.png`,
            blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAC4jAAAuIwF4pT92AAABx0lEQVQYlQG8AUP+AP/Wuf/00f/rxP/nvv/ctf/NqP/Xov/3sf/9sP/rn//4qv/anQD/xpD/y4/5t3v/3qj/1qH/z5j/1ZH/1JT/4pX/247/1Yf2sGgA/8V++bBt655Q/75/+rl38bN3/8h79sl4/8hw/9p5/9V/8ahXAP/Jhfesa+eZT//AhP/LlPa2iPrAiv/UkP/Gfv/Bffu5d+2cTwDypWf2rHb2qnL7s3z2q2z/uYH+vHnzs3bmoWTypWrqmWbUdz8A4olR8ap+2Jx3pmpIyoBO55Na45Zf7p1i5ItV03BF2X1Yy2I4ANySZdSedYpuVVpfXJuDbZ12VaBpUYFRP61jSbllSb5oSclmOgDRlGych2tVVlFEX5QCOVQyQ0lsaFc/MShnSTi0bEyqUiuqSSoAkmVBUFVNASM5ACZDABw2ADVJOVt1KTdLPEZJZko3nlAoqkwsACMbFllJQWU9AAARIwA1TAA4TAAaKQArSzkzPBcYEXo9IrxYMQAmKiqzQAubAABlSwkAIiwERSYAJic9IwChFwB5OABCJRyGOSUAnXU+rzcAvkwovlQAKDUEAEIxHlYBtkUApycAoRcAhVAAXToRH4jbsSJUndoAAAAASUVORK5CYII='
          }
        },
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
        { id: 'text', Component: ProjectText, props: { text: 'This work approaches my journey through grief and guilt from a beloved friend’s untimely and tragic passing.' }, },
        { id: 'space-1', Component: ProjectSpace },
        {
          id: 'image-1', Component: ProjectImage, props: {
            priority: true,
            dimensions: { width: 1433, height: 1072 },
            src: `${bucket}/images/issues/0/rhea-1.png`,
            blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAYACADASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAQFBgcI/8QALBAAAQMDAwEGBwEAAAAAAAAAAQIDBAUREgAGITEHExQiQWFCUVJxgZGhov/EABYBAQEBAAAAAAAAAAAAAAAAAAMCBP/EAB4RAAICAgIDAAAAAAAAAAAAAAECAAMRIQQTEjFx/9oADAMBAAIRAxEAPwDobclXk0vw4ixW5CncrhbhRiB68A6WibieeiBx2ElLh+FLmSfwbaS3siU5U6YIrq20hLmWLmN+B7azfsjMimqk0uZILjDynJEZLivMk94rNKfb1/esHcwuZSdCbTQDSrj3NDlb3caOLVNW4u9gAVcm9uoHz0UfdEqr1NUGXTjDUlGdl5Zf0DWdbneTJrC6eumoAitpeM97EoKitSktAW5+o3Nre+rD2bu9/WQlyQmQ+w2pl1YSR5r5gG5NzitJuOOdJ2knAMh6ClYcjRlt30ZqPBuwac5OIzSUocwKSQOvB41Qo4rzExTyNtPdLC8g8f4++jRpTw6XbsYb+mSnIsVPAHUWr0eXU3luyNtSUOKSEKKJziAQOgISANTHZRSHYM58tUpNNjIycUO8U4XVqtdRUoXJ4Hro0aVqUUZAhmxiME6n/9k='
          },
        },
        { id: 'space-2', Component: ProjectSpace, props: { heights: { lg: 160, sm: 60 }} },
        {
          id: 'image-2', Component: ProjectImage, props: {
            dimensions: { width: 1058, height: 1313 },
            width: '60%',
            src: `${bucket}/images/issues/0/rhea-2.png`,
            blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAgABoDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAABQQGBwP/xAAqEAACAgIBAwQBAwUAAAAAAAABAgMEBREABhIhEzFBYSIHMqEUQnGR8P/EABcBAQEBAQAAAAAAAAAAAAAAAAQCAQP/xAAgEQABBAIBBQAAAAAAAAAAAAABAAIDERIhBEFRYaHR/9oADAMBAAIRAxEAPwDQrsiVcdkcjYsTRwUou5o4YQ7OD48bI88iW81h6eNTI2cneekIg8pWBFMLEBu2QFthteda+ePUh3V8kjSekJDHH3qATot9/X+vjlY6kx9e/kZbFbB4S7uNS72K3e7mIN6jFVO3b9igH5U+eAxtgrRv0lsoOJdsdvKs9vA0Jmkjgy8sknps6qVI7tDZ0fb/AL64CkMjorCaXRGx+fOWJy7z9bNZvYC7VTIBooHjuiVYj2EgTRgDX92tFgp3xKshFeIDWgo9/wDHOebHi4za10b4zTwqZ+rVK/k8JVx2KM39bdykUcQRu0FuyQ6J+PAP88R6fwePwXTcuMCSrdMZa3Y9VlklJPkCT90evYa+t788Y6hp3p2oti7lerZrWxO0liIyKV9N0IAHkH8h5/ngOQsdXTVuySTAo8RHa8plmay7H22qqUHvs+fB+uSbvSdx5IwzGQfVLyebrdPV3zMMclpEtRV/TiRgwEmlBYtsHQJGzruJB++PmJ4yUJO18czLI9L9SdRZCpDl8pjKuJjuJNYp42FoopnBBkkca/JyANFt7+tc0z1t/tVlX4G/bl0OiLMGiqX/2Q=='
          },
        },
      ],
      links: [
        { displayName: 'Website', href: 'https://www.rhea-nayyar.com/' },
        { displayName: 'Instagram', href: 'https://www.instagram.com/sicksadshawty/' },
      ],
    },
  }
}
