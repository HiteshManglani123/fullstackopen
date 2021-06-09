import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from '../components/Blog'
import { mockComponent } from 'react-dom/test-utils'
import BlogForm from '../components/BlogForm'
//import Togglable from '../components/Togglable'

describe('testing render with toggable', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'The hunger games',
      author: 'Candice',
      url:'Hungergames.com/mockingbird',
      likes: 100
    }

    component = render(
      <Blog blog={blog}/>
    )
  })

  test('renders blog content', () => {

    expect(component.container).toHaveTextContent(
      'The hunger games Candice'
    )

    const div = component.container.querySelector('.togglableContentInBlog')
    expect(div).toHaveStyle('display: none')
  })

  test('renders url and likes when button is clicked', () => {
    const button = component.getByText('view')

    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContentInBlog')
    expect(div).not.toHaveStyle('display: none')
  })
})

describe('test blog likes', () => {
  test('like button is clicked twice', () => {
    let component

    const blog = {
      title: 'The hunger games',
      author: 'Candice',
      url:'Hungergames.com/mockingbird',
      likes: 100
    }
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} likeBlog={mockHandler}/>
    )

    const button = component.getByText('like')


    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('testing blog form', () => {

  test('adding blog', () => {
    let component

    const createBlog = jest.fn()

    component = render(
      <BlogForm createBlog={createBlog}/>
    )

    const form = component.container.querySelector('.blogFormDiv')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'The first avenger' }
    })

    fireEvent.change(author, {
      target: { value: 'Steve Rogers' }
    })

    fireEvent.change(url, {
      target: { value: 'marvelcomics.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('The first avenger')
    expect(createBlog.mock.calls[0][0].author).toBe('Steve Rogers')
    expect(createBlog.mock.calls[0][0].url).toBe('marvelcomics.com')
  })
})
