const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('assert');
const app = require('../index')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
});

test('blogs length is correct', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const body = response.body

    assert.strictEqual(body.length, 1);
});

test('unique _id identifier', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const body = response.body

    body.forEach(blog => {
        assert(blog._id, 'blog is missing _id')
    });

    // Check for uniqueness of _id values
    const ids = body.map((blog) => blog._id);
    const uniqueIds = new Set(ids);

    assert.strictEqual(ids.length, uniqueIds.size, 'Duplicate _id values found');
});

//Authorization needed we handle it in Jest test
/*test('post request is good', async () => {
    // First, create a user
    const newUser = {
      username: 'john_doe',
      name: 'John Doe',
      password: 'secretpassword',
    };
  
    // Create user first, get user ID
    const userResponse = await api
      .post('/api/users') // Assuming /api/users is the route for user creation
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const userId = userResponse.body.id; // User ID from the user creation response
  
    // Then, get the current blog count
    const get = await api.get('/api/blogs').expect(200);
    const len = get.body.length;
  
    // Now, create a blog post and associate it with the userId
    const newBlog = {
      title: 'New Blog',
      author: 'John Doe',
      url: 'http://newblog.com',
      likes: 10,
      user: userId, // Use the userId here
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    // Assert that the blog has been created successfully
    assert.ok(response.body._id, 'Blog is missing _id');
    assert.strictEqual(response.body.title, newBlog.title);
    assert.strictEqual(response.body.author, newBlog.author);
    assert.strictEqual(response.body.url, newBlog.url);
    assert.strictEqual(response.body.likes, newBlog.likes);
    assert.strictEqual(response.body.user.toString(), newBlog.user); // Check user association
    
    // Verify that the number of blogs has increased by 1
    const get2 = await api.get('/api/blogs').expect(200);
    const len2 = get2.body.length;
    assert.strictEqual(len2, len + 1);
  
    //Cleanup: Delete the blog and user after the test
    await api
      .delete(`/api/blogs/${response.body._id}`)
      .expect(204);
  });  

test('update blog post', async () => {
    // First, create a user (same as in the previous test)
    const newUser = {
      username: 'john_doe',
      name: 'John Doe',
      password: 'secretpassword'
    };
  
    const userResponse = await api
      .post('/api/users') 
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const userId = userResponse.body.id;
  
    // Create a new blog and associate it with the user
    const newBlog = {
      title: 'New Blog',
      author: 'John Doe',
      url: 'http://newblog.com',
      likes: 10,
      user: userId
    };
  
    const createResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const blogId = createResponse.body._id;
  
    // Update the blog post
    const updatedBlog = {
      title: 'Updated Blog Title',
      author: 'Jane Doe',
      url: 'http://updatedblog.com',
      likes: 20,
      user: userId // Ensure user is still associated
    };
  
    const updateResponse = await api
      .put(`/api/blogs/${blogId}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    // Check that the response contains the updated data
    assert.strictEqual(updateResponse.body.title, updatedBlog.title);
    assert.strictEqual(updateResponse.body.author, updatedBlog.author);
    assert.strictEqual(updateResponse.body.url, updatedBlog.url);
    assert.strictEqual(updateResponse.body.likes, updatedBlog.likes);
    assert.strictEqual(updateResponse.body.user.toString(), updatedBlog.user.toString());
  
    // Fetch the updated blog post
    const getResponse = await api.get(`/api/blogs/${blogId}`).expect(200).expect('Content-Type', /application\/json/);
    assert.strictEqual(getResponse.body.title, updatedBlog.title);
    assert.strictEqual(getResponse.body.author, updatedBlog.author);
    assert.strictEqual(getResponse.body.url, updatedBlog.url);
    assert.strictEqual(getResponse.body.likes, updatedBlog.likes);
    assert.strictEqual(getResponse.body.user.toString(), updatedBlog.user.toString());
  
    await api
      .delete(`/api/blogs/${blogId}`)
      .expect(204);
  }); */

after(async () => {
  await mongoose.connection.close()
})