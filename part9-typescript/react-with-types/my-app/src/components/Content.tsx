/* eslint-disable react/prop-types */
interface coursePart {
    name: string;
    exerciseCount: number  
}

// const Part: React.FC<{ part: coursePart }> = ({ part }) => {
const Part = (props: coursePart ) => {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.exerciseCount}</p>
    </div>
  )
}

interface coursePartList {
  courseParts: coursePart[]
}

const Content = ({ courseParts }: coursePartList ) => {
  return (
    <div>
      <p>
        {courseParts.map(course => {
          return <Part key={course.name} {...course} />
        })}
      </p>
    </div>
  )
};

export default Content;