
import React from 'react'
import LikeButton from './LikeButton'
import blogService from '../services/blogs'

const BlogList = ({ blogs, setBlogs, user }) => {
    const handleUpdate = async (blog) => {
    const updatedBlog = {
        author: blog.author,
        likes: blog.likes + 1,
        title: blog.title,
        url: blog.url,
        user: blog.user.id
    }
        const response = await blogService.update(blog.id, updatedBlog)
        const newBlogs = blogs.map(b => {
            if (b.id === blog.id) {
                return {...b, likes: b.likes + 1} 
            }
            return b
        })
        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
}


    const handleRemove = async (id) => {
        await blogService.remove(id)
        const filteredBlogs = blogs.filter(blog => blog.id !== id)
        filteredBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(filteredBlogs)
    }
    
    return (
      <div>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
              <div key={blog.id} style={{ border: '2px solid #000000', padding: '10px', marginBottom: '5px' }}>
                  <div>{blog.title} {blog.author}</div>
                  <div>{blog.url}</div>
                  <div>likes {blog.likes}</div>
                  <div>{blog.user.name}</div>
                  <LikeButton blog={blog} onUpdate={handleUpdate} />
                  {user && blog.user.username === user.username && (
                      <button onClick={() => handleRemove(blog.id)}>Remove</button>
                  )}
              </div>
          ))}
      </div>
  )
  
}

export default BlogList




