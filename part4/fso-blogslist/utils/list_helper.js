const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((prev, curr) => prev + curr.likes, 0)
  return likes
}

module.exports = {
  dummy,
  totalLikes,

}