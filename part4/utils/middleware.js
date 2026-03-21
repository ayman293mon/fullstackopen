const logger = require('./logger')
const User = require('../models/users')
const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('----------------')
    next()
}
const unknownEndPoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}
const errorHandler = (err, req, res, next) => {
    logger.error(err.message)
    if (err.name === 'CastError') {
        res.status(400).send({error: 'malformatted id'})
    } else if (err.name === 'ValidationError') {
        res.status(400).json({error: err.message})
    } else if (err.name === 'MongoServerError' && err.code === 11000) {
        res.status(400).json({error: 'username must be unique'})
    }
    next(err)
}
const varefieRefreshToken =  (req, res, next) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token not found' })
    }
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async  (err, user) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid refresh token' })
        }
        const exitingUser = await User.findById(user.id)
        if (!exitingUser) {
            return res.status(404).json({ error: 'User not found' })
        }
        req.user = user
        next()
    })
}
module.exports = {
    requestLogger, 
    unknownEndPoint,
    errorHandler,
    varefieRefreshToken
}