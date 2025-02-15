import Header from './Header'

const Numbers = ({ persons }) => {
  return (
    <>
      <Header title="Numbers" />
      {persons.map((person) => {
        return (
          <div key={person.id}>
            <img src={person.photo} style={{ width: 50 }} />
            {person.name}
            {person.phone}
          </div>
        )
      })}
    </>
  )
}

export default Numbers
