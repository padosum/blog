import { navigate } from 'gatsby'

const randomArticle = (tags) => {
  const posts = tags.reduce((prev, curr) => [...prev, ...curr.items], [])
  const randomPost = posts[Math.floor(Math.random() * posts.length)]
  navigate(randomPost.url)
}

export default randomArticle
