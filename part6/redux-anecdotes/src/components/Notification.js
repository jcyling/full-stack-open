import { useSelector } from 'react-redux'

const Notification = () => {
  const notifications = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notifications) {
    return (
      <div style={style}>
        {notifications}
      </div>
    )
  }
  else return null
}

export default Notification