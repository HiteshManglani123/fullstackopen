import React from 'react'

//header component
const Header =  ({title}) => {
    return (
      <>
        <h1>{title}</h1>
      </>
    )
  }
  
  //Part
  const Part = ({name, exercises}) => {
    return (
      <>
        <p>
          {name} {exercises}
        </p>
      </>
    )
  }
  
  //Content
  const Content = ({parts}) => {
    return (
      <>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </>
    )
  }
  
  //Total
  const Total = ({parts}) => {
  
    let sum = parts.reduce(function(sum, part) {
      return sum + part.exercises
    } , 0)
  
    return (
      <>
        <p>
          Number of exercises {sum}
        </p>
      </>
    )
  }

const Course = ({course}) => {
    return (
      <div>
        <Header title={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course