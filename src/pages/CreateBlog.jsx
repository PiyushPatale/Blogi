import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateBlog.css";
import { FaHome } from "react-icons/fa";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [newId, setNewId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs/latest");
        setNewId(res.data.latestId + 1);
      } catch (err) {
        setNewId(1);
      }
    };
    fetchLatestId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image || !content) {
      setError("All fields are required!");
      return;
    }
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/blogs", {
        id: newId,
        title,
        image,
        content,
        likes: 0,
      });

      navigate("/home");
    } catch (error) {
      setError("Failed to create blog. Try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="create-blog-container">
        <video autoPlay loop muted className="video-bg">
            <source src={require("../assets/bg.mp4")} type="video/mp4" />
        </video>
      <div className="form-card">
        <h2>Create Your Blog</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <i className="fas fa-hashtag"></i>
            <input
              type="text"
              value={`ID: ${newId}`}
              className="form-control"
              disabled
            />
          </div>
          <div className="form-group">
            <i className="fas fa-font"></i>
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <i className="fas fa-image"></i>
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <i className="fas fa-file-alt"></i>
            <textarea
              placeholder="Blog Content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
      <button className="floating-home-button" onClick={() => navigate("/")}>
              <FaHome size={24} />
      </button>
    </div>
  );
};

export default CreateBlog;
