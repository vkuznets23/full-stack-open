import { CoursePart } from '../types/CoursePart'

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  const itemStyle = {
    marginTop: '4px',
  }

  switch (part.kind) {
    case 'basic': {
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p style={itemStyle}>
            <em>{part.description}</em>
          </p>
        </div>
      )
    }
    case 'group': {
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p style={itemStyle}>project exercises {part.groupProjectCount}</p>
        </div>
      )
    }
    case 'background': {
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p style={itemStyle}>
            <em>{part.description}</em>
            <p style={itemStyle}>submit to {part.backgroundMaterial}</p>
          </p>
        </div>
      )
    }

    case 'special': {
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p style={itemStyle}>
            <em style={itemStyle}>{part.description}</em>
            <p style={itemStyle}>
              required skills: {part.requirements.join(', ')}
            </p>
          </p>
        </div>
      )
    }
  }
}

export default Part
