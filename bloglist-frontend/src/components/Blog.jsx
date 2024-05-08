/*const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

export default Blog*/

import React from 'react'

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>
          {blog.title} {blog.author}
        </div>
      ))}
    </div>
  )
}

export default BlogList