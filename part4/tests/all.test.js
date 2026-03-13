const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper.js')
const data = require('./data.js')
test('dummy returns one', () => {
  const result = listHelper.dummy(data.blogsEmpty)
  assert.strictEqual(result, 1)
})

describe('total likes', () => { 
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(data.blogsEmpty)
        assert.strictEqual(result, 0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(data.blogsOne)
        assert.strictEqual(result, 2)
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(data.blogsLarge)
        assert.strictEqual(result, 36)
    })
})

describe('favorite blog', () => {
    test('of empty list is null', () => {
        const result = listHelper.favoriteBlog(data.blogsEmpty)
        assert.strictEqual(result, null)
    })
    test('when list has only one blog equals that blog', () => {
        const result = listHelper.favoriteBlog(data.blogsOne)
        assert.deepStrictEqual(result, data.blogsOne[0])
    })
    test('of a bigger list is found right', () => {
        const result = listHelper.favoriteBlog(data.blogsLarge)
        assert.deepStrictEqual(result, data.blogsLarge[2])
    })
})

describe('most blogs', () => {
    test('of empty list is null', () => {
        const blogs = []
        const result = listHelper.mostBlogs(blogs)
        assert.strictEqual(result, null)
    })
    test('when list has only one blog equals that author with 1 blog', () => {
        const blogs = data.blogsOne
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 1 })
    })
})