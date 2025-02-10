# Exercises 2.1 - 2.5

### Course information (2.1 – 1.5)

1. Split code in components
2. Render collections and modules using `.map` method

### Phone book (2.6 — 2.17)

1. Create the phone book data structure and add functionality to add contacts with name and phone number using `useState`
2. Render the list of contacts dynamically using `.map()` and add event handler to add new contacts
3. Implement **check for duplicate names** when adding contacts and a **search bar** to filter contacts by name.

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

read more about debugging [here](https://developer.chrome.com/docs/devtools/javascript)
read more about `.map` method [here](https://react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key)

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

## How to create a form

1. create state for each input

```js
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
```

2. event handler for each input

```js
const handleNameChange = (event) => {
  setName(event.target.value);
};

const handleEmailChange = (event) => {
  setEmail(event.target.value);
};

const handlePasswordChange = (event) => {
  setPassword(event.target.value);
};
```

3. event handler for submission

```js
const handleSubmit = (event) => {
  event.preventDefault();
  // <...>

  //reset states
  setName("");
  setEmail("");
  setPassword("");
};
```

4. how JSX suppose to look like

```js
<form onSubmit={handleSubmit}>
  <input
    type="text"
    id="name"
    value={name}
    onChange={handleNameChange}
    placeholder="name"
  />
</form>
```

OR we can use one useState for all inputs

```js
const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
});
```

```js
const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
```

```js
const handleSubmit = (event) => {
  event.preventDefault();

  if (!formData.name || !formData.email || !formData.password) {
    setError("Все поля должны быть заполнены");
    return;
  }

  setError("");
  console.log(formData);
  setFormData({ name: "", email: "", password: "" });
};
```

each element looks like this in JSX:

```js
<div>
  <input
    type="text"
    id="name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="name"
  />
  <input
    type="email"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="email"
  />
</div>
```
