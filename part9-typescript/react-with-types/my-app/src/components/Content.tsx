import {
  CoursePart
} from "../types"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePart) => {
  switch (props.type) {
    case "normal": {
      return (
        <div>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
          <p>Exercise count: {props.exerciseCount}</p>
        </div>
      )
    }
      break;
    case "groupProject": {
      return (
        <div>
          <h3>{props.name}</h3>
          <p>Exercise count: {props.exerciseCount}</p>
          <p>Group project count: {props.groupProjectCount}</p>
        </div>
      )
    }
      break;
    case "submission": {
      return (
        <div>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
          <p>Exercise count: {props.exerciseCount}</p>
          <p>{props.exerciseSubmissionLink}</p>
        </div>
      )
    }
      break;

    case "special": {
      return (
        <div>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
          <p>Exercise count: {props.exerciseCount}</p>
          <p>Required skills: {props.requirements.map(value => `${value} `)}</p>
        </div>
      )
    }
      break;
    default:
      return assertNever(props);
      break;
  }
}

interface coursePartList {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: coursePartList) => {
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