const Blog = require('../models/blog.js')
const nonExistingId = async() => {
    const blog = new Blog({ 
        title: 'willremovethissoon', 
        author: 'test', 
        url: 'http://test.com'
     })
    await blog.save()
    await Blog.findByIdAndRemove(blog._id)
    return blog._id
}
const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
module.exports = {
    nonExistingId,
    blogsInDb,
}