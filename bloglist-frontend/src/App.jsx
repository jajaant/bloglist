import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={handleCreate}>
    <div>
      title:
      <input
      type="text"
      value={title}
      name="Title"
      onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author:
      <input
      type="text"
      value={author}
      name="Author"
      onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url:
      <input
      type="text"
      value={url}
      name="URL"
      onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    </form>
  )

  const handleCreate = async (event) => {
    event.preventDefault()
    await blogService.create({
      title, author, url
    })
    console.log("jotain tapahtuu")
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(false)
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
          <h2>create new</h2>
          {blogForm()}
          <button onClick={handleCreate}>create</button>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>)}
        </div>
      ) : (
        <div>
          <h1>log in to application</h1>
          {loginForm()}
        </div>
      )}
    </div>
  ) 
}

export default App