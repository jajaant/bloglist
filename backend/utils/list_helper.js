const dummy = (blogs) => {
  if(blogs.length === 0) {
    return 1
  } else {
    return 1
  }
}

const totalLikes = array => {
  const reducer = (sum, item) => {

    return sum + item.likes
  }
  return array.length === 0
    ? 0
    : array.reduce(reducer, 0)
}




module.exports = {
  dummy,
  totalLikes
}