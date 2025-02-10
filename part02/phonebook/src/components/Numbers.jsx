import Header from './Header'

const Numbers = ({ persons }) => {
  return (
    <>
      <Header title="Numbers" />
      {persons.map((person) => {
        return <p key={person.id}>{person.name}</p>
      })}
    </>
  )
}

export default Numbers
