const jwt = require('jsonwebtoken')
const User = require('../models/users')
const varefieRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token not found' })
    }
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async  (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid refresh token' })
        }
        req.user = user
        next()
    })
}
const varefieAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: 'Access token not found' })
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid access token' })
        }
        req.user = user
        next()
    })
}
const varefieUser = async (req, res, next) => {
    const userId = req.user.id
    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }
    req.user = user
    next()
}
module.exports = {  
    varefieRefreshToken, 
    varefieAccessToken,
    varefieUser
}