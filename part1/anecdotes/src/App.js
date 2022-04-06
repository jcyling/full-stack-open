import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState([])
  const [popular, setPopular] = useState("")

  if (votes.length === 0) {
    setVote(new Array((anecdotes.length)).fill(0));
  }

  const randQuote = () => {
    let rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  }

  const voteQuote = () => {
    const newVotes = [...votes];
    let index = selected;
    newVotes[index] += 1;
    setVote(newVotes);
    checkPopular();
  }

  const checkPopular = () => {
    // Find the index with the most votes
    const largestValue = votes.reduce((prev, curr) => curr > prev ? curr : prev );
    const index = votes.indexOf(largestValue);
    setPopular(anecdotes[index]);
  }
   
  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
      </div>
      <div>
        <p>Has {votes[selected] || 0} votes.</p>
        <button onClick={randQuote}>Anecdotes</button>
        <button onClick={voteQuote}>Vote</button>
      </div>
      <PopularQuote popular={popular}/>
    </>
  )
}

const PopularQuote = ({ popular}) => {
  if(!popular) {
    return (
      <p>Vote for your anecdote.</p>   
    )
  }
  else {
    return (
      <>
        <h2>Most Popular Anecdote</h2>
        <p>{popular}</p>
      </>
    )  
  }
}

export default App