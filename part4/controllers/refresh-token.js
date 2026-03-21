const refreshRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { varefieRefreshToken, varefieUser } = require('../middlewares/authMiddleware')
refreshRouter.post('/', varefieRefreshToken, varefieUser, (req, res) => {
    const userForToken = {
        username: req.user.username,
        id: req.user._id
    }
    const AccessToken = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '15m' })
    res.status(200).json({ AccessToken })
})
module.exports = refreshRouter 
