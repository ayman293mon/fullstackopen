const {test, describe, beforeEach, after} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const User = require('../models/users')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
beforeEach(async() => {
        console.log('clearing database')
        await User.deleteMany({})
        console.log('database cleared')
    })
after(async() => {
    console.log('closing database connection')
    await mongoose.connection.close()
    console.log('database connection closed')
})
describe('user api tests', () => {
    test('a valid user can be added', async() => {
        const newUser = {
            username: 'testuser',
            name: 'Test User',
            password: 'testpassword'
        }
        const savedUser = await api.post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        assert.strictEqual(savedUser.body.username, newUser.username)
        assert.strictEqual(savedUser.body.name, newUser.name)
    })
    test('a user with a username that already exists cannot be added', async() => {
        const newUser = {
            username: 'testuser',
            name: 'Test User',
            password: 'testpassword'
        } 
        await api.post('/api/users')
        .send(newUser)
        .expect(201)
        await api.post('/api/users')
        .send(newUser)
        .expect(400)
    })
    test('a user with a password that is too short cannot be added', async() => {
        const newUser = {
            username: 'testuser',
            name: 'Test User',
            password: 'pw'
        }
        await api.post('/api/users')
        .send(newUser)
        .expect(400)
    }) 
    test('a user with a username that is too short cannot be added', async() => {
        const newUser = {
            username: 'tu',
            name: 'Test User',
            password: 'testpassword'
        }
        await api.post('/api/users')
        .send(newUser)
        .expect(400)
    })
    test('a user with a username is too short and a password that is too short cannot be added', async() => {
        const newUser = {
            username: 'tu',
            name: 'Test User',
            password: 'pw'
        }
        await api.post('/api/users')
        .send(newUser)
        .expect(400)
    })
})
