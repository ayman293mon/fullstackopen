const userRouter = require('express').Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt')
userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ error: 'username and password are required' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username: username,
        name: name,
        passwordHash: passwordHash
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
})
userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})
module.exports = userRouter
