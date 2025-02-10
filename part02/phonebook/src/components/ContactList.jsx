import Header from './Header'

const Numbers = ({ persons }) => {
  return (
    <>
      <Header title="Numbers" />
      {persons.map((person) => {
        return (
          <p key={person.id}>
            <b>{person.name} </b>
            {person.phone}
          </p>
        )
      })}
    </>
  )
}

export default Numbers
