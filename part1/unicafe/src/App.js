import { useState } from 'react'


// Button component
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

// Statistic component
const Statistic = ({ text, state }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{state}</td>
    </tr>
  )
}

// General statistics component
const GenStatistic = ({ good, neutral, bad }) => {
  let total = good + neutral + bad

  if ((good + neutral + bad) == 0) {
    return (
      <div>
        No feedback yet
      </div>
    )
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text={"Good"} state={good} />
          <Statistic text={"Neutral"} state={neutral} />
          <Statistic text={"Bad"} state={bad} />
          <tr>
            <td>All</td>
            <td>{total}</td> 
          </tr>
          <tr>
            <td>Average</td>
            <td>{((good) + (bad * -1)) / total}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{good / total * 100}%</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={addGood} text="Good" />
      <Button handleClick={addNeutral} text="Neutral" />
      <Button handleClick={addBad} text="Bad" />

      <div>
        <GenStatistic good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App