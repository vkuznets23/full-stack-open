import React from "react"

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={`notification ${message ? 'show' : ''}`}>
        {message}
      </div>
    )
  }

  export default Notification;