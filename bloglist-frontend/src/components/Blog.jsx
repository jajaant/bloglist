// BlogList.jsx
import React from 'react'
import LikeButton from './LikeButton'

const BlogList = ({ blogs, setBlogs }) => {
    const handleUpdate = (updatedBlog) => {
        const newBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
        setBlogs(newBlogs)
    }

    
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <div>
            {sortedBlogs.map(blog => (
                <div key={blog.id}>
                    {blog.title} {blog.author}
                    <LikeButton blog={blog} onUpdate={handleUpdate} />
                </div>
            ))}
        </div>
    )
}

export default BlogList

