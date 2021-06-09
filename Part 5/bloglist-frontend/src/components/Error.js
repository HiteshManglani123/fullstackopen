import React from 'react'
import { useSelector } from 'react-redux'


const Error = () => {
  const error = useSelector(state => state.error)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notVisible = {
    display: 'none'
  }
  return(
    <div style={error === '' ? notVisible : style}>
      {error}
    </div>
  )
}

export default Error