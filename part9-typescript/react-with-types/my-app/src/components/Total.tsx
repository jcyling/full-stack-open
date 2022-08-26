interface Total {
  total: number;
}

const Total = (props: Total) => {
  return (
    <div>
      <p>
        Number of exercises: {props.total}
      </p>
    </div>
  )
};

export default Total;