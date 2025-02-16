import { useEffect } from 'react'

const Notification = ({ message, type, setMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 3000)
    return () => clearTimeout(timer)
  }, [message, setMessage])

  if (message === null) {
    return null
  }

  const messageClass = type === 'error' ? 'error' : 'success'

  return <div className={`notification ${messageClass}`}>{message}</div>
}

export default Notification
