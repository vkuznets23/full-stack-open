const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('totalLikes', () => {
  test('of an empty list is zero', () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0);
  });

  test('when list has only one blog, equals the likes of that blog', () => {
    const blogs = [
      {
        title: 'First Blog',
        author: 'John Doe',
        url: 'http://example.com/blog1',
        likes: 7,
      },
    ];

    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 7);
  });

  test('of a bigger list is calculated correctly', () => {
    const blogs = [
      {
        title: 'First Blog',
        author: 'John Doe',
        url: 'http://example.com/blog1',
        likes: 7,
      },
      {
        title: 'Second Blog',
        author: 'Jane Smith',
        url: 'http://example.com/blog2',
        likes: 5,
      },
      {
        title: 'Third Blog',
        author: 'Alice Johnson',
        url: 'http://example.com/blog3',
        likes: 12,
      },
    ];

    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 24); // 7 + 5 + 12
  });
});

describe('calculate which blog has most likes', () => {
    test('one blog', () => {
        const blogs = [
            {
              title: 'First Blog',
              author: 'John Doe',
              url: 'http://example.com/blog1',
              likes: 7,
            },
          ];
        const result = listHelper.favoriteBlog(blogs);
        const expected = {
                title: 'First Blog',
                author: 'John Doe',
                url: 'http://example.com/blog1',
                likes: 7,
            };
        assert.deepStrictEqual(result, expected);
        
    });
});

describe('author with max blogs', () => {
    test('no blogs', () => {
        const blogs = [];
        const result = listHelper.mostBlogs(blogs);
        const expected = null;
        assert.strictEqual(result, expected);
    });

    test('multiple blogs', () => {
        const blogs = [
            {
                title: 'First Blog',
                author: 'John Doe',
                url: 'http://example.com/blog1',
                likes: 7,
            },
            {
                title: 'Second Blog',
                author: 'John Doe',
                url: 'http://example.com/blog1',
                likes: 17,
            },
            {
                title: 'Third Blog',
                author: 'John Doe',
                url: 'http://example.com/blog1',
                likes: 27,
            },
            {
                title: 'New Blog',
                author: 'Blabla Doe',
                url: 'http://example.com/blog1',
                likes: 5,
            },
            {
                title: 'Newnew blog',
                author: 'Tolstoy',
                url: 'http://example.com/blog1',
                likes: 1,
            }
        ];

        const result = listHelper.mostBlogs(blogs);
        const expected = {
                author: "John Doe",
                blogs: 3,
        }
        assert.deepStrictEqual(result, expected);
    })
});

describe('most likes', () => {
    test('multiple autors', () => {
        const blogs = [
            { author: 'Author A', likes: 10 },
            { author: 'Author B', likes: 5 },
            { author: 'Author A', likes: 7 },
            { author: 'Author C', likes: 12 },
            { author: 'Author B', likes: 3 }
          ];
        const result = listHelper.mostLikes(blogs);
        const expected = {
            author: 'Author A',
            likes: 17,
        }
        assert.deepStrictEqual(result, expected);
    })

})
