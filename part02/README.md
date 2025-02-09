# Exercises 2.1 - 2.5

### Course information (2.1 – 1.5)

1. Split code in components
2. Render collections and modules using `.map` method

### Phone book (2.6 — 2.17)

### Countries API (2.18 — 2.20)

### How to run

Download repo, go to the part01 folder, install dependencies and run. It's running on http://localhost:5173/

```bash
git clone https://github.com/vkuznets23/full-stack-open.git
cd full-stack-open
cd part02
```

```bash
npm install
npm run dev
```

# Some notes from the theoretic part

## Debugging

Rule#1 — have 10-100 `console.logs` if something doesn't work

```js
console.log("props value is", props);
```

read more [here](https://developer.chrome.com/docs/devtools/javascript)

## `.map` method and keys

Since u need to add a key u might use index from the map (not recommended) or BETTER id

```js
const Note = ({ note }) => {
  return <li>{note.content}</li>;
};

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};
```

read more [here](https://react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key)

## `event` parameter

`event.preventDefault()` method, which prevents the default action (the default action would, among other things, cause the page to reload.)

If you want to define your event handler inline, wrap it in an anonymous function like so (otherwise this won’t fire on click—it fires every time the component renders):
`<button onClick={() => alert('...')}>`

## Event propagation

If you click on either button, its onClick will run first, followed by the parent `<div>` onClick. So two messages will appear. If you click the toolbar itself, only the parent `<div>` onClick will run.

```js
export default function Toolbar() {
  return (
    <div
      className="Toolbar"
      onClick={() => {
        alert("You clicked on the toolbar!");
      }}
    >
      <button onClick={() => alert("Playing!")}>Play Movie</button>
      <button onClick={() => alert("Uploading!")}>Upload Image</button>
    </div>
  );
}
```

To prevent this u need to **stop propagation**

```js
function Button({ onClick, children }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
```

Read more [here](https://react.dev/learn/responding-to-events)
