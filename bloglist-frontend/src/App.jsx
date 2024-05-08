import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification'
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
  const [errorMessage, setErrorMessage] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type) => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
      setNotificationType('')
    }, 3500)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = { title, author, url }
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      notify(`A new blog ${title} by ${author} added!`, 'success')
    } catch (exception) {
      notify('Failed to add blog', 'error')
    }
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
      notify('Logged in successfully!', 'success')
    } catch (exception) {
      notify('Wrong username or password', 'error')
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(false)
  }

  return (
    <div>
      <Notification message={notification} type={notificationType} />
      {user ? (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
          <h2>create new</h2>
          <BlogForm
            addBlog={addBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
          <Blog blogs={blogs} />
        </div>
      ) : (
        <div>
        <h2>login to application</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
        </div>
      )}
    </div>
  ) 
}

export default App