
import React from 'react'
import blogService from '../services/blogs'

const LikeButton = ({ blog, onUpdate }) => {
  const handleLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const response = await blogService.update(blog.id, updatedBlog)
    onUpdate(response)
  }
  return <button onClick={handleLike}>Like</button>
}

export default LikeButton


