const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
const favoriteBlog  = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return {
        ...favorite
    }
}
const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const authorFrequency = {}
    blogs.forEach(blog => {
        if (authorFrequency[blog.author]) {
            authorFrequency[blog.author] += 1
        } else {
            authorFrequency[blog.author] = 1
        }
    });
    const mostFrequentAuthor = Object.keys(authorFrequency).reduce((prev, current) => (authorFrequency[prev] > authorFrequency[current]) ? prev : current)
    return {
        author: mostFrequentAuthor,
        blogs: authorFrequency[mostFrequentAuthor]
    }
}
const mostLikes = (blogs) => {
    const authorLikes = {}
    blogs.forEach(blog => {
        if (authorLikes[blog.author]) {
            authorLikes[blog.author] += blog.likes
        }
        else {
            authorLikes[blog.author] = blog.likes
        }
    })
    const mostLikedAuthor = Object.keys(authorLikes).reduce((prev, current) => (authorLikes[prev] > authorLikes[current]) ? prev : current)
    return {
        author: mostLikedAuthor,
        likes: authorLikes[mostLikedAuthor]
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes,
    mostBlogs
}
