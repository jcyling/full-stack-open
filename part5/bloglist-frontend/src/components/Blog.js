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
    console.log(user)
    console.log(blog.user)
    if (user.name === blog.user.name) {
      return <button onClick={() => confirmDelete(blog)}>remove</button>
    }
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
          <div>Url: {blog.url}</div>

          <div>
            Likes: {blog.likes}
            <button onClick={() => updateLikes(blog.id)}>like</button>
          </div>
          { user !== null && checkUser(user, blog) }
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