import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificateReducer'
import anecdoteService from './services/anecdoteService'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: notificationReducer
  }
})

export default store