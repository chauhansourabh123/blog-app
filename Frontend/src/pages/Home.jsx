import React from "react";
import {Navigate} from "react-router-dom"
import Hero from "../Home/Hero.jsx";
import Trending from "../Home/Trending.jsx";
import Devotional from "../Home/Devotional.jsx";
import Creater from "../Home/Creater.jsx"
import "../App.css"

function Home() {
  
  return (
    <div className="max-width mt-4 p-4 md:p-10"
    style={{ margin: "0 auto", minHeight: "90vh" }}>
      <Hero/>
      <Trending/>
      <Devotional/>
      <Creater/>
    </div>
  );
}

export default Home;
