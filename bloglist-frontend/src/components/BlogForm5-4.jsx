
const blogForm = ({ 
  addBlog, 
  title, 
  setTitle, 
  author, 
  setAuthor, 
  url, 
  setUrl }) => (
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
  )

  export default blogForm