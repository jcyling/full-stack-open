import React from 'react'

const Course = ({ course }) => {

  const Header = ({ course }) => <h1>{course.name}</h1>

  const Total = ({ sum }) => <p>Number of exercises {sum}</p>

  const Part = ({ part }) =>
    <p>
      {part.name} {part.exercises}
    </p>

  const Content = ({ parts }) =>
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </>

  return (
    <div>
      <Header course={course} />
      {/* {console.log(course.parts)} */}
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((prev, curr) =>
        prev + curr.exercises, 0)} />
    </div>
  )
}

export default Course