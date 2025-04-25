import { Diary } from '../types/Diary'

interface DiariesProps {
  diaries: Diary[]
}

//const Diaries = ({ diaries }: { diaries: Diary[] }) => { ... }
const Diaries = ({ diaries }: DiariesProps) => {
  const weatherEmoji: Record<string, string> = {
    sunny: '☀️',
    rainy: '🌧️',
    cloudy: '☁️',
    stormy: '⛈️',
    windy: '🌬️',
  }

  const visibilityEmoji: Record<string, string> = {
    great: '👍👍',
    good: '👍',
    ok: '🙂',
    poor: '😞',
  }

  const diaryStyle = {
    marginBottom: '1rem',
    padding: '0.5rem',
    border: '1px solid #ccc',
  }

  return (
    <>
      <h2>Diaries</h2>
      {diaries.map(({ id, date, weather, visibility }) => {
        return (
          <div key={id} style={diaryStyle}>
            <p>
              <strong>{date}</strong>
            </p>
            <p>
              Weather: {weatherEmoji[weather]} {weather}
            </p>
            <p>
              Visibility: {visibilityEmoji[visibility]} {visibility}
            </p>
          </div>
        )
      })}
    </>
  )
}

export default Diaries
