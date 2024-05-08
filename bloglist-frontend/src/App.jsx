import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'





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
  const [loginVisible, setLoginVisible] = useState(false)

  const noteFormRef = useRef()



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

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  /*const blogForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>new note</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            title={username}
            author={password}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleSubmit={addBlog}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }*/

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
      notify(`${username} logged in succesfully`, 'success')
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
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <BlogForm createBlog={addBlog} notify={notify}/>
          </Togglable>
          <Blog blogs={blogs} setBlogs={setBlogs} user={user}/>
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