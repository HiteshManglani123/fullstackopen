import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>blogs</h2>

      <form onSubmit={addBlog} className='blogFormDiv'>
        <h3>Create new</h3>
        <div>
        title:
          <input
            id='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit' id='create-blog-button'>create</button>
      </form>
    </div>
  )
}

export default BlogForm