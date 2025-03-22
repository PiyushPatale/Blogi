import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";
import { FaCopy, FaShareAlt } from "react-icons/fa";

const BlogCard = ({ blog }) => {
  const handleCopyText = () => {
    const textToCopy = `${blog.title}\n${blog.content}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Text copied to clipboard!");
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/blog/${blog._id}`;
    const text = `${blog.title} - Read more here: ${shareUrl}`;

    if (navigator.share) {
      navigator
        .share({
          title: blog.title,
          text: text,
          url: shareUrl,
        })
        .catch((err) => console.log("Error sharing", err));
    } else {
      alert("Sharing not supported. Try copying the text instead.");
    }
  };
  return (
    <div className="blog-card">
      <div className="blog-content">
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-description">{blog.content.substring(0, 120)}...</p>
        <p className="blog-meta">
          {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <div className="blog-actions">
          <Link to={`/blog/${blog._id}`} className="read-more">
            Read more <span className="arrow">→</span>
          </Link>
          <button className="action-btn copy-btn" onClick={handleCopyText}>
            <FaCopy /> Copy
          </button>
          <button className="action-btn share-btn" onClick={handleShare}>
            <FaShareAlt /> Share
          </button>
        </div>
      </div>

      <div className="blog-image-container">
        <img src={blog.image} alt={blog.title} className="blog-image" />
      </div>
    </div>
  );
};

export default BlogCard;
