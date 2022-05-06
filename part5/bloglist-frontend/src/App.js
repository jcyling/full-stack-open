import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  // User states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedInUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      // Pass in login form parameters to POST request
      const user = await loginService.login({
        username, password,
      })

      // Send user to localStorage
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      // Set user state if successful
      blogService.setToken(user.token)
      setUser(user)

      // Empty form parameters
      setUsername('')
      setPassword('')

    } catch (exception) {
      setMessage('Wrong username or password')
      setMessageType(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('logout')
    window.localStorage.clear()
    setUser(null)
  }

  const toggleRef = useRef()


  const createBlog = (blog) => {
    toggleRef.current.toggleVisibility()
    blogService
      .create(blog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage('Added successfully')
        setMessageType(true)
      })
      .catch(() => {
        setMessage('Unable to add blog')
        setMessageType(false)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

  }

  const updateLikes = (id) => {
    const blog = blogs.find(item => item.id === id)
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user._id,
      likes: blog.likes + 1
    }

    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(() => {
        setMessage(
          'Something went wrong.'
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  const removeBlog = (id) => {
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
      .catch(error => {
        setMessage(error.response.data.error.toString())
        setMessageType(false)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} messageType={messageType} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        /> :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      }
      {user !== null ?
        <Togglable buttonLabel='new blog' ref={toggleRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        : null}
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog}
              updateLikes={updateLikes}
              removeBlog={removeBlog}
              user={user}
            />
          )}
      </div>
    </div>
  )
}

export default App
