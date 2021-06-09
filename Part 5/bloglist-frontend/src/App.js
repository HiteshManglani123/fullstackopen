import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  const blogFormRef = useRef()

  const sortBlogs = (blogs) => {
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      sortBlogs(blogs),
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login( {
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setError(error.response.data.error)
      setTimeout(() => setError(''), 3000)
    }
  }

  const loginForm = () => {
    return (
      <>
        <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </>
    )
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        sortBlogs(blogs.concat(returnedBlog))
        setError(`A new blog ${blogObject.title} by ${blogObject.author} has been created`)
        setTimeout(() => setError(''), 5000)
      })
      .catch((error) => {
        setError(error.response.data.error)
        setTimeout(() => setError(''), 5000)
      })
  }

  const likeBlog = (blogObject) => {
    blogService
      .update(blogObject)
      .then(returnedBlog => {
        sortBlogs(blogs.map(blog => returnedBlog.id !== blog.id ? blog : returnedBlog))
        // setError(`liked ${blogObject.title}`)
        // setTimeout(() => {
        //   setError('')
        // }, 3000)
      })
      .catch(error => console.log(error))

  }

  const deleteBlog = (blog) => {
    blogService
      .deleteBlog(blog)
      .then(response => {
        sortBlogs(blogs.filter(newBlog => newBlog.id !== blog.id ))
        setError(response.data)
        setTimeout(() => setError(''), 3000)
      })
      .catch(error => {
        setError(error.response.data.error)

        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  const UserDisplay = ({ user }) => {
    return (
      <>
        <p>{user.username} is logged in</p>
      </>
    )
  }

  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        <UserDisplay user={user}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
        )}
        <br></br>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </>
    )
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <div>
      <Error/>
      {user === null ?
        loginForm() :
        blogForm()
      }
      <br></br>
      <button onClick={() => {logOut()}}>Logout</button>
      {error}
    </div>
  )
}

export default App