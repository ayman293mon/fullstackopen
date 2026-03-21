const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/users.js')
const logger = require('../utils/logger.js')
const { varefieAccessToken, varefieUser } = require('../middlewares/authMiddleware.js')
blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })    
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end()
    }
})
blogsRouter.post('/', varefieAccessToken, varefieUser, async (req, res) => {
    const { title, url, likes } = req.body
    if (!title || !url) {
        return res.status(400).json({ error: 'title and url are required' })
    }
    const blog = new Blog({
        title: title,
        author: req.user.name,
        url: url,
        user: req.user._id,
        likes: likes || 0
    })
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', varefieAccessToken, varefieUser, async (req, res) => {
    const { title, url, likes } = req.body
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        res.status(404).end()
    }
    logger.info(`User ${req.user.username} is trying to update blog ${blog.title}`)
    if (blog.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'You are not authorized to update this blog' })
    }
    blog.title = title
    blog.author = req.user.name
    blog.url = url
    blog.likes = likes || 0
    const updatedBlog = await blog.save()
    res.json(updatedBlog)
})
blogsRouter.delete('/:id', varefieAccessToken, varefieUser, async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        res.status(404).end()
    }
    console.log(`User ${req.user.username} is trying to delete blog ${blog.title}`)
    if (blog.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'You are not authorized to delete this blog' })
    }
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = blogsRouter