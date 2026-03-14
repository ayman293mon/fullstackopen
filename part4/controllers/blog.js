const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
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