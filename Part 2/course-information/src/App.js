import React from 'react'
import Course from './components/course'

const Courses = ({courses}) => {
  return (
    <>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </>
  )
}

function App() {
  const courses = [
    {
    
      name: 'Half Stack application development',
      id: 1,
      parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises:  7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
    }
    ]
    return (
      <div>
        <Courses courses={courses}/>
      </div>
    )
}

export default App;
