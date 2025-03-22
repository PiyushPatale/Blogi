import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import Main from "./pages/Main";
import CreateBlog from "./pages/CreateBlog";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/blog/:id" element={<BlogPage />} />
    </Routes>
  );
};

export default App;
