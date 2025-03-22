const Blog = require("../models/blogModel");

exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalBlogs = await Blog.countDocuments();

    res.json({
      blogs,
      totalBlogs,
      hasMore: skip + blogs.length < totalBlogs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getLatestBlogId = async (req, res) => {
  try {
    const latestBlog = await Blog.findOne().sort({ id: -1 });
    res.json({ latestId: latestBlog ? latestBlog.id : 0 });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch latest blog ID" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blogs = req.body;

    if (Array.isArray(blogs)) {
      if (blogs.length === 0) {
        return res.status(400).json({ message: "No blogs provided" });
      }
      const newBlogs = await Blog.insertMany(blogs);
      return res
        .status(201)
        .json({ message: "Blogs added successfully", blogs: newBlogs });
    }

    const { id, title, image, content } = blogs;
    const newBlog = new Blog({ id, title, image, content });
    await newBlog.save();
    res.status(201).json({ message: "Blog added successfully", blog: newBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: error.message });
  }
};

exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.likes += 1;
    await blog.save();
    res.json({ message: "Blog liked!", likes: blog.likes });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
