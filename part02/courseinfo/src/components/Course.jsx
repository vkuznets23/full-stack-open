import React from 'react';

const Header = ( {course} ) => <h1> {course.name} </h1>;

const Part = ( {name, exercises} ) => <p>{name} {exercises} </p>;

const Content = ({ parts }) => (
    <>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
);
  
const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p><strong>Total of {total} exercises</strong></p>;
};

const Course = ({ course }) => (
    <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
);
export default Course