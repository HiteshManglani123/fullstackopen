
let timeout
export const setError = (error, timeInMs) => {
  clearTimeout(timeout)
  return async dispatch => {
    await dispatch({
      type:'SET_ERROR',
      error
    })
    timeout = setTimeout(() => {
      dispatch({
        type:'REMOVE_ERROR'
      })
    }, timeInMs * 1000)
  }
}

const reducer = (state = '', action) => {
  console.log(action)
  switch(action.type) {
  case 'SET_ERROR': {
    const newState = action.error
    return newState
  }
  case 'REMOVE_ERROR': {
    const newState = ''
    return newState
  }
  default:
    return state
  }
}

export default reducer