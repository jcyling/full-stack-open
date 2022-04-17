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
        console.log("A")

        return (
            <div style={successMessage} className="message">
                {message}
            </div>
        )
    }
    else {
        return (
            <div style={failMessage} className="message">
                {message}
            </div>
        )
    }
}

export default Notification