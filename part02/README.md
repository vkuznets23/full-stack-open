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
