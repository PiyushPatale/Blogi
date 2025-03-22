import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";

const Main = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="main-container">
      <div className="main-content">
        <h1>Welcome to <span>BLOGI</span></h1>
        <p>Discover amazing stories, insights, and ideas from writers around the world.</p>
        <div className="btn-group">
            <button onClick={() => navigate("/home")}  style={{backgroundColor:"#0442a0", color:'white', padding:'7px'}}>
                Explore All Blogs
            </button>
            <button onClick={() => navigate("/create")} className="btn btn-secondary">
                Write your Own
            </button>
        </div>
      </div>
      <svg className="wave-divider" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#fff" fillOpacity="1"
        d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,90.7C672,85,768,107,864,138.7C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128V320H0Z">
        </path>
      </svg>
    </div>
    <div className="featured-section">
        <h2>Featured Stories</h2>
        <p>Explore our collection of thought-provoking articles</p>
    </div>
    </>
  );
};

export default Main;
