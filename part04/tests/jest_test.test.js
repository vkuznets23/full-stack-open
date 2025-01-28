const listHelper = require('../utils/list_helper');
const supertest = require('supertest');
const { app, server } = require('../index');
const mongoose = require('mongoose')
const api = supertest(app);

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
})

describe('fav blog', () => {
    const blogs = [
        {
          _id: '1',
          title: 'Blog 1',
          author: 'Author 1',
          url: 'http://example.com/1',
          likes: 10,
          __v: 0
        },
        {
          _id: '2',
          title: 'Blog 2',
          author: 'Author 2',
          url: 'http://example.com/2',
          likes: 20,
          __v: 0
        },
        {
          _id: '3',
          title: 'Blog 3',
          author: 'Author 3',
          url: 'http://example.com/3',
          likes: 15,
          __v: 0
        }
      ];
      test('when list has multiple blogs, returns the one with most likes', () => {
        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual(blogs[1]);
      });

      test('when multiple blogs have the same highest likes, return any one of them', () => {
        const blogsWithTie = [
          {
            _id: '1',
            title: 'Blog A',
            author: 'Author A',
            url: 'http://example.com/a',
            likes: 25,
            __v: 0
          },
          {
            _id: '2',
            title: 'Blog B',
            author: 'Author B',
            url: 'http://example.com/b',
            likes: 25,
            __v: 0
          }
        ];
  
        const result = listHelper.favoriteBlog(blogsWithTie);
        expect(result.likes).toBe(25); // We only care that the likes are correct
      });
})

describe('Blog API tests', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });


    test('unique _id identifier', async () => {
        const response = await api.get('/api/blogs').expect(200);
        const body = response.body;
    
        // Ensure every blog has an _id
        body.forEach((blog) => {
        expect(blog._id).toBeDefined();
        });
    
        // Check for uniqueness of _id values
        const ids = body.map((blog) => blog._id);
        const uniqueIds = new Set(ids);
    
        expect(ids.length).toBe(uniqueIds.size); // Ensure no duplicate _id values
    });
    test('HTTP POST to /api/blogs successfully creates a new blog', async () => {
        // Step 1: Create a new user and log in to obtain a token
        const newUser = {
          username: 'test_user',
          name: 'Test User',
          password: 'password123',
        };
      
        // Create a user
        await api.post('/api/users').send(newUser).expect(201);
      
        // Log in to get the token
        const loginResponse = await api
          .post('/api/login')
          .send({
            username: newUser.username,
            password: newUser.password,
          })
          .expect(200);
      
        const token = loginResponse.body.token;
      
        // Step 2: Get the initial count of blogs
        const initialBlogs = await api.get('/api/blogs').expect(200);
        const initialBlogCount = initialBlogs.body.length;
      
        // Step 3: Define a new blog to be created
        const newBlog = {
          title: 'Authenticated Blog',
          author: 'Test Author',
          url: 'http://authenticatedblog.com',
          likes: 25,
        };
      
        // Step 4: Create the new blog with a POST request, including the token
        const response = await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${token}`) // Add the token to the Authorization header
          .send(newBlog)
          .expect(201) // Expect HTTP 201 Created
          .expect('Content-Type', /application\/json/);
      
        // Step 5: Verify that the blog content matches what was sent
        const createdBlog = response.body;
        expect(createdBlog).toHaveProperty('_id'); // Ensure the blog has an ID
        expect(createdBlog.title).toBe(newBlog.title);
        expect(createdBlog.author).toBe(newBlog.author);
        expect(createdBlog.url).toBe(newBlog.url);
        expect(createdBlog.likes).toBe(newBlog.likes);
      
        // Step 6: Verify that the total number of blogs increased by one
        const updatedBlogs = await api.get('/api/blogs').expect(200);
        expect(updatedBlogs.body.length).toBe(initialBlogCount + 1);
      
        // Cleanup: Delete the created blog
        await api
          .delete(`/api/blogs/${createdBlog._id}`)
          .set('Authorization', `Bearer ${token}`) // Include token for deletion
          .expect(204);
      });
      
  });

afterAll(async () => {
    console.log('Closing MongoDB connection...');
    await mongoose.connection.close(); // Closes the database connection
    console.log('Connection closed.');
    server.close();
});
  