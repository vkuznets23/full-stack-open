# Exercises 2.1 - 2.5

### Course information (2.1 – 1.5)

1. Split code in components
2. Render collections and modules using `.map` method

### Phone book (2.6 — 2.17)

1. Create the phone book data structure and add functionality to add contacts with name and phone number using `useState`
2. Render the list of contacts dynamically using `.map()` and add event handler to add new contacts
3. Implement **check for duplicate names** when adding contacts and a **search bar** to filter contacts by name.

   **I also added:**

- db generator using **faker API** and **Unsplash API**
- CSS styles and media queries + icons from react library
- Image uploading or placeholder when no image

4. Made JSON server to run my `.json file` as server using `axios` library to fetch data from the server

### How to run

Download repo, go to the part02 folder, install dependencies and run.

```bash
git clone https://github.com/vkuznets23/full-stack-open.git
cd full-stack-open
cd part02/phonebook
```

```bash
npm install
npm run dev
npm run server
```

**Client-side(React):** http://localhost:5173/

**Server-side(Backend):** http://localhost:3001/contacts

### Countries API (2.18 — 2.20)

This is a React-based web application that fetches country data from the Countries API and weather data from the OpenWeatherMap API. The application allows users to search for countries, view basic information, and explore detailed weather information. The user can also navigate to a detailed view of a country and go back to the main list.

### How to run

Download repo, go to the part02 folder, install dependencies and run.

```bash
git clone https://github.com/vkuznets23/full-stack-open.git
cd full-stack-open
cd part02/info-countries
```

```bash
npm install
```

Create a .env file at the root of the project and add your OpenWeatherMap API key:

```js
VITE_WEATHER_API_KEY = your_api_key_here;
```

```bash
npm run dev
```

# Some notes from the theoretic part

## Useful links:

read more about debugging [here](https://developer.chrome.com/docs/devtools/javascript)

read more about `.map` method [here](https://react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key)

Read more [here](https://react.dev/learn/responding-to-events)

## `event` parameter

`event.preventDefault()` method, which prevents the default action (the default action would, among other things, cause the page to reload.)

If you want to define your event handler inline, wrap it in an anonymous function like so (otherwise this won’t fire on click—it fires every time the component renders):
`<button onClick={() => alert('...')}>`

## How to create a form

1. create state for each input
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

## Getting data from server

We can have a db.json file start the JSON Server without a separate installation by running the following npx command in the root directory of the application (this will "fake" running a real server)

```js
npx json-server --port 3001 db.json
```

##

Install Axios

```bash
npm install axios
```

Create file `service.js`
**GET**

```js
import axios from "axios";

const getContacts = async () => {
  try {
    const response = await axios.get("http://localhost:3001/contacts");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};
```

**POST**

```js
const addContact = async (newContact) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/contacts",
      newContact
    );
    console.log("Contact added:", response.data);
  } catch (error) {
    console.error("Error adding contact:", error);
  }
};
```

**DELETE**

```js
const deleteContact = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/contacts/${id}`);
    console.log("Contact deleted");
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
};
```

**PUT**

```js
const updateContact = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/contacts/${id}`,
      updatedData
    );
    console.log("Contact updated:", response.data);
  } catch (error) {
    console.error("Error updating contact:", error);
  }
};
```
