const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((prev, curr) => prev + curr.likes, 0)
  return likes
}

const favouriteBlog = (blogs) => {
  const likesList = blogs.map(blog => blog.likes)
  const mostLikes = Math.max(...likesList)
  const blogMostLiked = blogs.find(blog => blog.likes === mostLikes)
  delete blogMostLiked._id
  delete blogMostLiked.__v
  delete blogMostLiked.url
  return blogMostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  // mostBlogs
}