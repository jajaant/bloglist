import { useState } from 'react'

const BlogForm = ({ createBlog, notify }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)

    const addBlog = (event) => {
        event.preventDefault()
        try {
        createBlog({
            title: title,
            author: author,
            url: url,
            likes: likes
        })
        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes(0)
        notify(`a new blog '${title}' by ${author} added`, 'success')
      } catch (exception) {
        notify('Failed to add blog', 'error')
      }
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
      onChange={(event) => setTitle(event.target.value)}
      />
    </div>
    <div>
      author:
      <input
      type="text"
      value={author}
      name="Author"
      onChange={(event) => setAuthor(event.target.value)}
      />
    </div>
    <div>
      url:
      <input
      type="text"
      value={url}
      name="URL"
      onChange={(event) => setUrl(event.target.value)}
      />   
    </div>
    <button type="submit">create</button>
    </form>
        
      </div>
    )
  }
  
  export default BlogForm