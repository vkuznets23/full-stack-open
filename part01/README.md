# Exercises 1.1 – 1.14

### Course information (1.1 – 1.5)

1. Split React components into separate parts (App, Header, Content, Total).
2. Display the total number of course hours using props.

### State of a component (1.6 – 1.14)

1. **Unicafe:** Implement a simple feedback collector (good, neutral, bad) with statistics.
2. **Anecdotes:** Display a random quote with the ability to vote for it.

### How to run

Download repo, go to the part01 folder, install dependencies and run. It's running on http://localhost:5173/

```bash
git clone https://github.com/vkuznets23/full-stack-open.git
cd full-stack-open
cd part01
```

```bash
npm install
npm run dev
```

# Some notes from the theoretic part

### How to start the app using Vite

```bash
# npm 6.x (outdated, but still used by some):
npm create vite@latest introdemo --template react

# npm 7+, extra double-dash is needed:
npm create vite@latest introdemo -- --template react
```

It's possible to get error message regarding components, to prevent it add this to the `eslint.config.js`

```json
'react/prop-types': 0,
```

### Hook `useState`

In React, useState is a hook that allows you to manage and store component state. When you call useState, it gives you two things:

1. The current state value (e.g., a number or string).
2. A function to update the state

```js
const [count, setCount] = useState(0);
```

### Why use the prev (previous) value `in useState`?

React updates state asynchronously, so when you call the update function, the new state might not be available immediately. To get the correct updated state based on the old one, you can use the prev (previous) value.

```js
const [count, setCount] = useState(0);

const increment = () => {
  setCount((prevCount) => prevCount + 1); // Update based on previous value
};
```

#### When to use prev?

1. When the new state depends on the old state.
2. When you're making multiple state updates at once
