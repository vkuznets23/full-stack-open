# Full-Stack Blog API with JWT Authentication

This project is a simple **Blog API** built with **Node.js**, **Express**, **MongoDB**, and **JWT** authentication. It allows users to register, log in, and create blogs, which are associated with the user who created them.

## What You've Done:

### 1. **Setup Project**
- Created a Node.js application using **Express**.
- Set up **MongoDB** database for storing user and blog data.

### 2. **JWT Authentication**
- Added **JWT** authentication for logging in and protecting routes.
- Users are required to log in to generate a JWT, which is then used to authenticate requests for creating new blogs.

### 3. **Blog Creation and CRUD Operations**
- Users can create, read, update, and delete blogs.
- Each blog is associated with a user via the `user` field in the blog document.
- Blogs are populated with user details like username and name.

### 4. **Middleware**
- Added middleware (`authenticateToken`) to ensure that only logged-in users can create blogs by attaching their JWT to the request.

---

## How to Run the Project:

### 1. **Clone the Repository**

```bash
[git clone https://github.com/vkuznets23/full-stack-open.git OpenUni
cd OpenUni/Part04
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Create .env file **
```bash
MONGODB_URI=your_mongo_database_uri
TEST_MONGODB_URI=your_mongo_testing_database_uri
SECRET=your_secret_key
```
Ensure the JWT_SECRET is set to a secret key of your choice. This will be used for signing JWT tokens

### 4. ** Start server **
```bash
npm start
```
The server will be running on http://localhost:3003

## How to Use the API:
### 1. Register an user
Make a POST request to `/api/users` with the following body:
```json
{
  "username": "your-username",
  "password": "your-password"
}
```
This will create a new user and store it in the database.

### 2. Login and Get JWT Token
Make a POST request to `/api/login` with the following body:
```json
{
  "username": "your-username",
  "password": "your-password"
}
```
You will receive a JWT token in the response, which you can use for authentication in further requests
```json
{
  "token": "your_jwt_token"
}
```
### 3. Create a New Blog (Authenticated Request)
Make a POST request to /api/blogs with the following headers and body:

#### Headers:
```
Authorization: Bearer your_jwt_token
```
#### Body:
```json
{
  "title": "New Blog Title",
  "author": "Author Name",
  "url": "https://example.com",
  "likes": 10
}
```
This will create a new blog. Only authenticated users (with a valid token) can create a blog.

### 4. Get All Blogs:
Make a `GET` request to `/api/blogs` to retrieve a list of all blogs in the system.

### 5. Get a Specific Blog by ID:
Make a `GET` request to `/api/blogs/:id` (replace `:id` with the actual blog ID) to get a specific blog.

### 6. Update a Blog:
Make a `PUT` request to `/api/blogs/:id` (replace `:id` with the actual blog ID) with the new data in the request body.

### 7. Delete a Blog:
Make a DELETE request to /api/blogs/:id (replace :id with the actual blog ID) to delete a specific blog.

## Technologies Used:
- Node.js and Express for building the API
- MongoDB for database storage
- JWT (JSON Web Tokens) for user authentication
- Mongoose for interacting with MongoDB
- dotenv for managing environment variables

## Troubleshooting:
If you encounter any issues, here are some tips:

- Make sure MongoDB is running and the connection string is correct.
- If you get an "invalid username or password" error during login, ensure the credentials are correct in the database.
- If the "Token is missing" error occurs, verify that the JWT is being sent properly in the request header with the key Authorization.
