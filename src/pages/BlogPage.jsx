import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LikeButton from "../components/LikeButton";
import CommentSection from "../components/CommentSection";
import "./BlogPage.css";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(res.data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <h3>Loading...</h3>;

  return (
    <div className="blog-page">
      <div className="blog-content">
        <img src={blog.image} alt={blog.title} className="blog-image" />
        <div className="blog-text">
        <div className="title-container">
          <h1 className="blog-title">{blog.title}</h1>
          <LikeButton blogId={blog._id} likes={blog.likes} />
        </div>
        <p className="blog-description">{blog.content}</p>
        </div>
      </div>
      <div className="blog-comments">
        <h2 className="comment-title">Comments</h2>
        <CommentSection blogId={blog._id} />
      </div>
    </div>
  );
};

export default BlogPage;
