const dummy = (blogs) => {
  return 1
}

const getSum = (blogs) => {

  let sum = blogs.reduce((sum, element) => {
    return sum += element.likes
  }, 0)

  return blogs.length === 0
    ? 0
    : sum
}

const getFavorite = (blogs) => {
  if (blogs.length !== 0) {
    let favoriteBlog = blogs.reduce((favorite, blog) => {
      return blog.likes > favorite.likes
        ? favorite = blog
        : favorite
    }, blogs[0])

    let favoriteBlogFormat = {
      title: favoriteBlog.title,
      author: favoriteBlog.author,
      likes: favoriteBlog.likes
    }

    return favoriteBlogFormat
  } else {
    return 0
  }
}

const mostBlogs = (blogs) => {
  let topBlog = blogs.reduce((topBlog, blog) => {
    //new blog
    let filteredBlogs =  blogs.filter((blogInList) => blogInList.author === blog.author)
    //top blog
    let filteredTopBlogs = blogs.filter((blogsInList) => blogsInList.author === topBlog.author)
    return filteredBlogs.length > filteredTopBlogs.length
      ? topBlog = blog
      : topBlog
  }, blogs[0])
  return topBlog
}

const mostLikes = (blogs) => {
  let topBlog = mostBlogs(blogs)

  let topBlogs = blogs.filter((blog) => blog.author === topBlog.author)
  let topBlogsLikes = topBlogs.reduce((sum, blog) => {
    return sum += blog.likes
  }, 0)
  return {
    author: topBlog.author,
    likes: topBlogsLikes
  }
}

module.exports = {
  dummy,
  getSum,
  getFavorite,
  mostBlogs,
  mostLikes
}