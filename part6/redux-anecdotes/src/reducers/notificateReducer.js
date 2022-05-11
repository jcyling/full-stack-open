import { createSlice } from '@reduxjs/toolkit'

const initialState = ['Hello']

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    newNotification(state, action) {
      const newState = action.payload
      return newState
    },
    removeNotification(state, action) {
      return action.payload
    }
  },
})

export const setNotification = (content, time) => {
  return async dispatch => {
    newNotification(content)
    setTimeout(removeNotification, time)
  }
}

export const { newNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer