/* eslint-disable react/prop-types */
interface courseParts {
  name: string;
  exerciseCount: number
}

const Part: React.FC<{ part: courseParts }> = ({ part }) => {
  return (
    <div>
      <p>{part.name}</p>
      <p>{part.exerciseCount}</p>

    </div>

  )
}

const Content: React.FC<{ courseParts: courseParts[] }> = ({ courseParts })  => {
  return (
    <div>
      <p>
        {/* {console.log(courseParts)} */}
        {courseParts.map(course => {
          return <Part key={course.name} part={course}/>
        })}
      </p>
    </div>
  )
};

export default Content;