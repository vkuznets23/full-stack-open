import React from "react"

const MasgError = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={`error ${message ? 'show' : ''}`}>
        {message}
      </div>
    )
  }

export default MasgError;