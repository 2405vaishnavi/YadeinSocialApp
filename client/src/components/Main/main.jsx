import React from "react";
import memories from "../../assets/real4.png";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import logo from "../../assets/img1.png";
import SlidingBanners from '../SlidingBanners/slidingbanners';
import './main.css'; // Import your CSS file if needed

export default function Home() {
  return (
    <div>
      <Navbar />
      <SlidingBanners />
      <div className="mid">
        <img src={memories} alt="Memories" className="full-width-image" />
      </div>
    </div>
  );
}
