import React, { useState } from 'react'
import { setError } from '../reducers/errorReducer'
import { useDispatch } from 'react-redux'
const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeButtonHandler = () => {
    const newLikes = blog.likes + 1
    const newBlog = { ...blog, likes: newLikes }
    likeBlog(newBlog)
    dispatch(setError(`Testing that you liked ${blog.title}`, 5))
  }

  const deleteBlogHandler = () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}`)) {
      deleteBlog(blog)
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <div style={hideWhenVisible}>
          <button id='view-details-blog' onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <button id='hide-details-blog' onClick={toggleVisibility}>hide</button>
        </div>
      </div>
      <div style={showWhenVisible} className='togglableContentInBlog'>
        <div>{blog.url}</div>
        <div className='blogLikes'>
          {blog.likes}
          <button id='like-blog'onClick={likeButtonHandler}>like</button>
        </div>
        <button id='remove-blog' onClick={deleteBlogHandler}>remove</button>
      </div>
    </div>
  )
}

export default Blog