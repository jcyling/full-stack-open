import { voteQuote} from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificateReducer"
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  console.log(useSelector(state => state))
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    // Dispatch action to increase vote
    dispatch(voteQuote(id))
    dispatch(setNotification(`Added vote to ${id}`, 1000))

  }

  return (
    <div>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList