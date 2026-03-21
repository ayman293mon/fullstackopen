const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/users')
const loginRouter = require('express').Router()
const logger = require('../utils/logger')
loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({username})
    logger.info(`user: ${user}`)
    const passwordCorrect = user === null ? 
       false : 
       await bcrypt.compare(password, user.passwordHash)
    if (!user || !passwordCorrect) {
        logger.info('invalid username or password') 
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }
    logger.info('login successful', { username: user.username, id: user.id })
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const AccessToken = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '15m' })
    const RefreshToken = jwt.sign(userForToken, process.env.REFRESH_SECRET, { expiresIn: '7d' })
    response.cookie('refreshToken', RefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // this cookie will expire in 7 days
    })
    response.status(200).json({ AccessToken })
})

module.exports = loginRouter