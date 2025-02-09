const Total = ({ parts }) => {
  return (
    <>
      <p>
        <b>
          {`total of exercises:
          ${parts.reduce((sum, ex) => {
            return sum + ex.exercises
          }, 0)}`}
        </b>
      </p>
    </>
  )
}

export default Total
