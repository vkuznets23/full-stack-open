interface FormProps {
  handleSubmit: (e: React.SyntheticEvent) => void
  date: string
  setDate: (value: React.SetStateAction<string>) => void
  weather: string
  setWeather: (value: React.SetStateAction<string>) => void
  visibility: string
  setVisibility: (value: React.SetStateAction<string>) => void
  comment: string
  setComment: (value: React.SetStateAction<string>) => void
}

const Form = (props: FormProps) => {
  return (
    <>
      <h2>Add new diery</h2>
      <form onSubmit={props.handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={props.date}
            onChange={(e) => props.setDate(e.target.value)}
            placeholder="Enter date"
            required
          />
        </div>
        <div>
          <label htmlFor="weather">Weather:</label>
          {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={props.weather === option}
                onChange={(e) => props.setWeather(e.target.value)}
                required
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <label htmlFor="visibility">Visibility:</label>
          {['great', 'good', 'ok', 'poor'].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={props.visibility === option}
                onChange={(e) => props.setVisibility(e.target.value)}
                required
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            value={props.comment}
            onChange={(e) => props.setComment(e.target.value)}
            placeholder="Enter comment"
            required
          />
        </div>
        <button type="submit">Add Diary</button>
      </form>
    </>
  )
}

export default Form
