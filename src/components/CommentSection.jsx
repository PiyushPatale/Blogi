import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CommentSection.css";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/comments/${blogId}`
      );
      setComments(res.data);
    };
    fetchComments();
  }, [blogId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const res = await axios.post(
      `http://localhost:5000/api/comments/${blogId}`,
      { text: newComment }
    );
    setComments([res.data, ...comments]);
    setNewComment("");
  };

  return (
    <div className="comment-section">
      <ul className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment._id} className="comment-item">
              <span className="comment-text">{comment.text}</span>
            </li>
          ))
        ) : (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        )}
      </ul>
      <div className="comment-input">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post</button>
      </div>
    </div>
  );
};

export default CommentSection;
