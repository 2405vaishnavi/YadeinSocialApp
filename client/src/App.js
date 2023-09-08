// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import Main from "./components/Main/main";
import Detail from "./components/Details/Detail";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/details" element={<Detail />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
