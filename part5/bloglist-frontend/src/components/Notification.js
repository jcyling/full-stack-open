const Notification = ({ message, messageType }) => {
  const successMessage = {
    color: 'green',
    fontSize: '16px',
    padding: '20px',
    border: '3px solid green',
    borderRadius: '5px',
    margin: '10px'
  }
  const failMessage = {
    color: 'red',
    fontSize: '16px',
    padding: '20px',
    border: '3px solid red',
    borderRadius: '5px',
    margin: '10px'
  }

  if (message === null) {
    return null
  }
  else if (messageType) {
    return (
      <div className="message" style={successMessage}>{message}</div>
    )
  }
  else {
    return (
      <div className="message" style={failMessage}>{message}</div>
    )
  }
}

export default Notification