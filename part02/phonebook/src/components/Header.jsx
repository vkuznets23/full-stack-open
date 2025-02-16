import { MdAdd } from 'react-icons/md'
import { IoCloseSharp } from 'react-icons/io5'

const Header = ({ title, persons, isToggled, setIsToggled }) => {
  return (
    <div className="header">
      <div>
        <h1>{title}</h1>
        <p style={{ paddingLeft: 5, paddingTop: 5 }}>
          Total {persons.length} contacts
        </p>
      </div>
      <button className="add-button" onClick={() => setIsToggled(!isToggled)}>
        {isToggled ? <MdAdd /> : <IoCloseSharp />}
      </button>
    </div>
  )
}

export default Header
