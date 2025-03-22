import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import "./LikeButton.css"; // Import CSS for styling
import axios from "axios";

const LikeButton = ({ blogId, likes }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

    const handleLike = async () => {
        await axios.put(`http://localhost:5000/api/blogs/${blogId}/like`);
        setLikeCount(likeCount + 1);
        setLiked(!liked);
      };

  return (
    <motion.button
      whileTap={{ scale: 1.2 }}
      animate={{ scale: liked ? 1.2 : 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`like-button ${liked ? "liked" : ""}`}
      onClick={handleLike}
    >
      <FaHeart className="heart-icon" /> <span className="like-count">{likeCount}</span>
    </motion.button>
  );
};

export default LikeButton;
