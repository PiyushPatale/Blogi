import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogList from "../components/BlogList";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageLimit = 20;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/blogs?page=${page}&limit=${pageLimit}`
      );
      console.log(res.data.blogs);
      setBlogs((prevBlogs) => [...prevBlogs, ...res.data.blogs]);
      if (res.data.blogs.length < pageLimit) setHasMore(false);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="home-container">
      <video autoPlay loop muted className="video-bg">
        <source src={require("../assets/bg.mp4")} type="video/mp4" />
      </video>
      <h2 style={{ fontSize: "50px" }} className="blog-title">
        Latest Blogs
      </h2>
      <p className="blog-subtitle">
        Discover amazing stories, insights, and ideas from writers around the
        world.
      </p>
      <InfiniteScroll
        dataLength={blogs.length}
        next={fetchBlogs}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <BlogList blogs={blogs} />
      </InfiniteScroll>
      <button className="floating-home-button" onClick={() => navigate("/")}>
        <FaHome size={24} />
      </button>
    </div>
  );
};

export default Home;
