import { MdAdd } from 'react-icons/md'

const Header = ({ title, children }) => {
  return (
    <div className="header">
      <div>
        <h1>{title}</h1>
        {children}
      </div>
      <button className="add-button">
        <MdAdd />
      </button>
    </div>
  )
}

export default Header
