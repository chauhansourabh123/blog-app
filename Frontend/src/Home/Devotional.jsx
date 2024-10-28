import React from "react";
import useHeroBlogs from "../context/HeroBlogs.jsx";
import { Link } from "react-router-dom"

function Devotional() {
  const { heroBlogs } = useHeroBlogs();
  const devotional = heroBlogs?.filter((blog) => blog.category === "God");

  return (
    <div className="mt-10">
      <h1 className="font-semibold text-xl text-black dark:text-white">
        Devotional
      </h1>
      <p className="text-center text-sm">
        The concept of gods varies widely accross different cultures, religion
        and belief system.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {devotional &&
          devotional.slice(0,5).map((blog) => (
            <Link to={`/image/${blog._id}`} key={blog._id} className="relative h-28 w-48 rounded-lg overflow-hidden">
              <p className="absolute bottom-6 left-2 font-semibold text-white">{blog.title}</p>
              <p className="absolute bottom-2 left-2 font-medium text-white">{blog.category}</p>
              <img className="w-full" src={blog.blogPost} alt="blogpost" />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Devotional;
