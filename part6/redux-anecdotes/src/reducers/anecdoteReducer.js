import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlicer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const update = action.payload
      const newState = state.map(item => item.id !== update.id ? item : update)
      return newState
    }
  }
})

// Async functions are externalized from the reducer and components
export const initializeAnecdotes = () => {
  return async dispatch => {
    // Make server request
    const anecdotes = await anecdoteService.getAll()
    // Update the redux store here with server response
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createQuote = (content) => {
  return async dispatch => {
    const newQuote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newQuote))
  }
}

export const voteQuote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const foundAnecdote = anecdotes.find(item => item.id === id)
    const itemToVote = {
      ...foundAnecdote,
      votes: foundAnecdote.votes + 1
    }
    const updatedItem = await anecdoteService.voteItem(id, itemToVote)
    console.log(updatedItem)
    dispatch(updateAnecdote(updatedItem))
  }
}

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlicer.actions

export default anecdoteSlicer.reducer

