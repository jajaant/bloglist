import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
      title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
      author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
      url:
          <input
            type="text"
            value={url}
            name="URL"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>

    </div>
  )
}

export default BlogForm