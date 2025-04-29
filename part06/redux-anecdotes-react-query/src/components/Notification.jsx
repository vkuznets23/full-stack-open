import { useContext } from 'react'
import MyContext from '../context'

const Notification = () => {
  const { state } = useContext(MyContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: state.notification ? 'block' : 'none',
  }

  return <div style={style}>{state.notification}</div>
}

export default Notification
