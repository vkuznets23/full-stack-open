# Phonebook Application

This is a full-stack web application for managing a phonebook, where users can add, update, and delete contacts. The app features both a backend (Node.js/Express) and a frontend (React), connected to a MongoDB database. The project is designed to showcase how to build and deploy a web app with a backend and frontend, implementing essential features like CRUD operations, form validation, and deployment to Render.

## Technologies Used

- **Backend:**
  - **Node.js**: JavaScript runtime for building the backend API.
  - **Express.js**: Web framework for building the API and handling HTTP requests.
  - **MongoDB**: NoSQL database used for storing contact data.
  - **Mongoose**: Object Data Modeling (ODM) library for MongoDB to simplify data interaction and validation.
  - **Render**: Cloud platform for deploying the backend API.
  - **Morgan**: HTTP request logger middleware for Node.js.
  - **CORS**: Middleware for enabling cross-origin requests between frontend and backend.

- **Frontend:**
  - **React.js**: JavaScript library for building user interfaces, used for creating the dynamic frontend of the application.
  - **React Hooks**: Used for managing state and lifecycle in functional components (e.g., `useState`, `useEffect`, `useCallback`).
  - **Axios**: Promise-based HTTP client used to make requests from the frontend to the backend API.
  - **ESLint**: JavaScript linter to enforce consistent code style and find potential issues in the code.
  - **Prettier**: Code formatter to maintain consistent code formatting across the project.

- **Deployment:**
  - **MongoDB Atlas**: Cloud-based database service for hosting MongoDB.
  - **Render**: Used to deploy the full-stack application to the cloud, allowing the app to be accessible from anywhere.

## Features

- **Add Contact**: Users can add a new contact with a name and phone number.
- **Update Contact**: If a contact already exists, users can update their phone number.
- **Delete Contact**: Users can remove a contact from the phonebook.
- **Form Validation**: The form validates that both name and phone number are provided and that the phone number is in the correct format.
- **Notifications**: Success and error messages are displayed when actions are performed (e.g., adding or updating contacts).
- **Responsive UI**: The user interface is responsive, making it accessible on both desktop and mobile devices.

## How to Run the Project Locally
### 1. Clone the repository:
```bash
git clone https://github.com/vkuznets23/full-stack-open/
cd part03
```
### 2. Install dependencies
#### backend:
```bash
cd phonebook_backend
npm install
```
#### frontend:
```bash
cd phonebook_frontend
npm install
```

### 3. Set up environment variables
Create a .env file in the backend directory with the following variables:
```bash
MONGO_URI=your_mongo_connection_string
```

### 4. Start the development server
```bash
cd phonebook_backend
npm start
```
```bash
cd phonebook_backend
npm start
```

The backend should now be running on http://localhost:3002 and the frontend on http://localhost:3000.

## Deployment
The backend and frontend are deployed on Render and MongoDB Atlas. You can access the deployed app https://phonebook-app-ey5a.onrender.com/
