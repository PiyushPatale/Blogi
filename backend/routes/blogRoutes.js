const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  likeBlog,
  getLatestBlogId,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/latest", getLatestBlogId);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.put("/:id/like", likeBlog);

module.exports = router;
