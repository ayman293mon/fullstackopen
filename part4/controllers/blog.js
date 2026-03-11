const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
})

blogsRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id).then(blog => {
        if (blog) {
            res.json(blog)
        } else {
            res.status(404).end()
        }
    }).catch(err => next(err))
})
blogsRouter.post('/', (req, res, next) => {
    const { title, author, url, likes } = req.body
    const blog = new Blog({
        title: title,
        author: author,
        url: url, 
        likes: likes
    })
    blog.save()
    .then(savedBlog => {
        res.status(201).json(savedBlog)
    }).catch(err => next(err))
})
blogsRouter.put('/:id', (req, res, next) => {
    const { title, author, url, likes } = req.body
    Blog.findById(req.params.id)
    .then(blog => {
        if (!blog) {
            res.status(404).end()
        }
        blog.title = title
        blog.author = author
        blog.url = url
        blog.likes = likes
        blog.save()
        .then(updatedBlog => {
            res.json(updatedBlog)
        }).catch(err => next(err))
    })
})
blogsRouter.delete('/:id', (req, res, next) => {
    Blog.findByIdAndDelete(req.params.id).then(() => {
        res.status(204).end()
    }).catch(err => next(err))  
})

module.exports = blogsRouter