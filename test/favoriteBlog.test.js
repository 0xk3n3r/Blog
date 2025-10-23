const { test, describe } = require('node:test')
const assert = require('node:assert')
const favoriteBlog = require('../utils/favoriteBlog').favoriteBlog

describe('favorite blog', () => {
    test('of empty list is null', () => {   
        const blogs = []
        const result = favoriteBlog(blogs)
        assert.strictEqual(result, null)
    })

    test('when list has multiple blogs, returns the one with most likes', () => {
        const blogs = [
            {
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7
            },
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12
            },
            {
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "https://example.com/go-to-statement",
                likes: 5
            }
        ];

        const favorite = favoriteBlog(blogs);
        assert.deepStrictEqual(favorite, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        });
    });
})