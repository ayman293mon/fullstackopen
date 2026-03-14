const {test, describe, beforeEach, after} = require('node:test')
const supertest = require('supertest')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog.js')
const blogs = require('./data').blogsLarge
const assert = require('node:assert')
// clear the database and add the initial blogs before each test
beforeEach(async() => {
    console.log('clearing database and adding initial blogs')
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
    console.log('database cleared and initial blogs added')
})
// close the database connection after all tests are done
after(async() => {
    console.log('closing database connection')
    await mongoose.connection.close()
    console.log('database connection closed')
})
describe('blog api tests', () => {
    test('blogs are returned as json', async() => {
        console.log('testing that blogs are returned as json')
        await api.get('/api/bloglist')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('all blogs are returned', async() => {
        console.log('testing that all blogs are returned')
        const response = await api.get('/api/bloglist')
        assert.strictEqual(response.body.length, blogs.length)
    })
    test('he unique identifier property of the blog posts is named id', async() => {
        const response = await api.get('/api/bloglist')
        const blog = response.body[0]
        assert.ok(blog.id)
        assert.ok(!blog._id)
    })
    test('a valid blog can be added', async() => {
        const newBlog = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'http://testblog.com',
            likes: 7
        }
        const savedBlog = 
        await api.post('/api/bloglist')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        assert.deepStrictEqual(savedBlog.body, {...newBlog, id: savedBlog.body.id})
        const allBlogs = await helper.blogsInDb()
        assert.strictEqual(allBlogs.length, blogs.length + 1)
    })
    test('if the likes property is missing from the request, it will default to 0', async() => {
        const newBlog = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'http://testblog.com'
        }
        const savedBlog = 
        await api.post('/api/bloglist')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        assert.deepStrictEqual(savedBlog.body, {...newBlog, id: savedBlog.body.id, likes: 0})
    })
    test('if the title property is missing from the request, the backend responds with status code 400 Bad Request', async() => {
        const newBlog = {
            author: 'Test Author',
            url: 'http://testblog.com',
            likes: 7
        }
        await api.post('/api/bloglist')
        .send(newBlog)
        .expect(400)
    })
    test('if the url property is missing from the request, the backend responds with status code 400 Bad Request', async() => {
        const newBlog = {
            title: 'Test Blog',
            author: 'Test Author',
            likes: 7
        }
        await api.post('/api/bloglist')
        .send(newBlog)
        .expect(400)
    })
})