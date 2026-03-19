const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/users.js')
const userRouter = require('./users.js')

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
blogsRouter.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body
    if (!title || !url) {
        return res.status(400).json({ error: 'title and url are required' })
    }

    const blog = new Blog({
        title: title,
        author: author,
        url: url, 
        likes: likes || 0
    })
    const user_random = await User.findOne({});
    if (user_random) {
        blog.user = user_random._id
        user_random.blogs = user_random.blogs.concat(blog._id)
        await user_random.save()
    }
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
})
blogsRouter.put('/:id', async (req, res) => {
    // if like is missed, set it to 0 to avoid error when trying to update a blog without likes
    const { title, author, url, likes } = req.body
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        res.status(404).end()
    }
    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes || 0
    const updatedBlog = await blog.save()
    res.json(updatedBlog)
})
blogsRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    if (!blog) {
        res.status(404).end()
    } else {
        res.status(204).end()
        }
})

module.exports = blogsRouter