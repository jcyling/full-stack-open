import { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [showDetail, setShowDetail] = useState(false)

  const toggleDetail = () => {
    if (showDetail === true) setShowDetail(false)
    else setShowDetail(true)
  }

  const confirmDelete = (blog) => {
    if (window.confirm(`Sure you want to delete ${blog.title}?`)) {
      removeBlog(blog.id)
    }
  }

  const checkUser = (user, blog) => {
    if (user) {
      if (user.username === blog.user.username) {
        console.log(blog.user.name)
        console.log(user.name)
        return <button onClick={() => confirmDelete(blog)}>remove</button>
      }
    }
    else return null
  }

  return (
    <div>
      {showDetail ?
        <div className="blog">
          <div>
            {blog.title}
            <button onClick={toggleDetail}>hide</button>
          </div>
          <div>Author: {blog.author}</div>
          <div className="blog-url">Url: {blog.url}</div>

          <div className="blog-likes">
            Likes: {blog.likes}
            <button className="btn-like" onClick={() => updateLikes(blog.id)}>like</button>
          </div>
          { console.log(user) }
          { checkUser(user, blog) }
        </div> :
        <div>
          <div className="blog">
            {blog.title}
            <button onClick={toggleDetail}>show</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Blog