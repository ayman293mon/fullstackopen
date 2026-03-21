const {test, describe, beforeEach, after} = require('node:test')
const supertest = require('supertest')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog.js')
const blogs = require('./data').blogsLarge
const User = require('../models/users.js')
const assert = require('node:assert')
const { title } = require('node:process')
const { url } = require('node:inspector')
// clear the database and add the initial blogs before each test
beforeEach(async() => {
    console.log('clearing database and adding initial blogs')
    await User.deleteMany({})
    await api.post('/api/users')
    .send({username: 'testuser', name: 'Test Author', password: 'password'})
    const loginResponse = await api.post('/api/login')
    .send({username: 'testuser', password: 'password'})
    const token = loginResponse.body.AccessToken
    await Blog.deleteMany({})
    for (let blog of blogs) {
        const newBlog = {
            title: blog.title,
            author: 'testuser',
            url: blog.url,
            likes: blog.likes
        }
        await api.post('/api/bloglist')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
    }
})
// close the database connection after all tests are done
after(async() => {
    console.log('closing database connection')
    await mongoose.connection.close()
    console.log('database connection closed')
})
describe('blog api tests', () => {
    // test('blogs are returned as json', async() => {
    //     await api.get('/api/bloglist')
    //     .expect(200)
    //     .expect('Content-Type', /application\/json/)
    // })
    // test('all blogs are returned', async() => {
    //     const response = await api.get('/api/bloglist')
    //     assert.strictEqual(response.body.length, blogs.length)
    // })
    // test('the unique identifier property of the blog posts is named id', async() => {
    //     const response = await api.get('/api/bloglist')
    //     const blog = response.body[0]
    //     assert.ok(blog.id)
    //     assert.ok(!blog._id)
    // })
    // test('a valid blog can be added', async() => {
    //     const loginResponse = await api.post('/api/login')
    //     .send({username: 'testuser', password: 'password'})
    //     const token = loginResponse.body.AccessToken
    //     const newBlog = {
    //         title: 'Test Blog',
    //         author: 'Test Author',
    //         url: 'http://testblog.com',
    //         likes: 7
    //     }
    //     const savedBlog = 
    //     await api.post('/api/bloglist')
    //     .set('Authorization', `Bearer ${token}`)
    //     .send(newBlog)
    //     .expect(201)
    //     .expect('Content-Type', /application\/json/)
    //     assert.deepStrictEqual(savedBlog.body, {...newBlog, id: savedBlog.body.id})
    //     const allBlogs = await helper.blogsInDb()
    //     assert.strictEqual(allBlogs.length, blogs.length + 1)
    // })
    // test('if the likes property is missing from the request, it will default to 0', async() => {
    //     const loginResponse = await api.post('/api/login')
    //     .send({username: 'testuser', password: 'password'})
    //     const token = loginResponse.body.AccessToken
    //     const newBlog = {
    //         title: 'Test Blog',
    //         author: 'Test Author',
    //         url: 'http://testblog.com'
    //     }
    //     const savedBlog = 
    //     await api.post('/api/bloglist')
    //     .set('Authorization', `Bearer ${token}`)    
    //     .send(newBlog)
    //     .expect(201)
    //     .expect('Content-Type', /application\/json/)
    //     assert.deepStrictEqual(savedBlog.body, {...newBlog, id: savedBlog.body.id, likes: 0})
    // })
    // test('if the title property is missing from the request, the backend responds with status code 400 Bad Request', async() => {
    //     const loginResponse = await api.post('/api/login')
    //     .send({username: 'testuser', password: 'password'})
    //     const token = loginResponse.body.AccessToken
    //     const newBlog = {
    //         author: 'Test Author',
    //         url: 'http://testblog.com',
    //         likes: 7
    //     }
    //     await api.post('/api/bloglist')
    //     .set('Authorization', `Bearer ${token}`)
    //     .send(newBlog)
    //     .expect(400)
    // })
    // test('if the url property is missing from the request, the backend responds with status code 400 Bad Request', async() => {
    //     const loginResponse = await api.post('/api/login')
    //     .send({username: 'testuser', password: 'password'})
    //     const token = loginResponse.body.AccessToken
    //     const newBlog = {
    //         title: 'Test Blog',
    //         author: 'Test Author',
    //         likes: 7
    //     }
    //     await api.post('/api/bloglist')
    //     .set('Authorization', `Bearer ${token}`)
    //     .send(newBlog)
    //     .expect(400)
    // })
    test('a blog can be deleted', async() => {
        const responseAllBlogsAtStart = await api.get('/api/bloglist')
        const AllBlogsAtStart = responseAllBlogsAtStart.body
        const logInUser = await api.post('/api/login')
        .send({username: 'testuser', password: 'password'})
        const token = logInUser.body.AccessToken
        const blogToDelete = AllBlogsAtStart[0]
        await api.delete(`/api/bloglist/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        const responseAllBlogsAtEnd = await api.get('/api/bloglist')
        const AllBlogsAtEnd = responseAllBlogsAtEnd.body
        assert.strictEqual(AllBlogsAtEnd.length, AllBlogsAtStart.length - 1)
        const id = blogToDelete.id
        const ids = AllBlogsAtEnd.map(blog => blog.id)
        assert.ok(!ids.includes(id))
    })
    test('a blog can be updated', async() => {
        const responseAllBlogsAtStart = await api.get('/api/bloglist')
        const AllBlogsAtStart = responseAllBlogsAtStart.body
        const logInUser = await api.post('/api/login')
        .send({username: 'testuser', password: 'password'})
        const token = logInUser.body.AccessToken
        const blogToUpdate = AllBlogsAtStart[0]
        const updatedBlog = {
            title: 'Updated Blog',
            url: 'http://updatedblog.com',
            likes: 10
        }
        const expectedBlog = {
            ...blogToUpdate,
            title: updatedBlog.title,
            url: updatedBlog.url,
            likes: updatedBlog.likes
        }
        await api.put(`/api/bloglist/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedBlog)
        .expect(200)
        const responseAllBlogsAtEnd = await api.get('/api/bloglist')
        const AllBlogsAtEnd = responseAllBlogsAtEnd.body
        assert.strictEqual(AllBlogsAtEnd.length, AllBlogsAtStart.length)
        const updatedBlogFromDb = AllBlogsAtEnd.find(blog => blog.id === blogToUpdate.id)
        assert.deepStrictEqual(updatedBlogFromDb, {...expectedBlog, id: blogToUpdate.id})   
    })
})