const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    author: "Robert C. Martin",
    title: "Clean Code",
    url: "http://example.com/clean-code",
    likes: 10,
  },
  {
    author: "Edsger W. Dijkstra",
    title: "On the Art of Programming",
    url: "http://example.com/art-programming",
    likes: 15,
  },
  {
    author: "Robert C. Martin",
    title: "The Clean Architecture",
    url: "http://example.com/clean-architecture",
    likes: 20,
  },
  {
    author: "Michael Chan",
    title: "Some Blog",
    url: "http://example.com/some-blog",
    likes: 5,
  },
  {
    author: "Robert C. Martin",
    title: "Refactoring",
    url: "http://example.com/refactoring",
    likes: 8,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const blogsIdList = async () => {
  const blogs = await blogsInDb();
  return blogs.map((blog) => blog.id);
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  blogsIdList,
  usersInDb,
};
