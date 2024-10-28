import React from "react";
import Card from "../component/Card.jsx";
import useHeroBlogs from "../context/HeroBlogs.jsx"

function Hero() {
  const { heroBlogs, loading } = useHeroBlogs();
  
  if (loading) {
    return <div className="flex items-center justify-center"><span className="loading loading-bars loading-lg"></span></div>; 
  }

  if (!heroBlogs.length) {
    return <p>No blogs found.</p>; 
  }


  return (
   <div className="flex flex-wrap gap-3 items-center justify-center">
    {heroBlogs && heroBlogs.reverse().slice(0,4 ).map((blog)=>(
      <Card key={blog._id} blog={blog}/>
    ))}
   </div>
  );
}

export default Hero;
