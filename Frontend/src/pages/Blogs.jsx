import React from "react";
import useHeroBlogs from "../context/HeroBlogs.jsx";
import { Link } from "react-router-dom";

function Blogs() {
  const { heroBlogs, loading } = useHeroBlogs();

  return (
    <div
      className="max-width mt-4 p-10"
      style={{ margin: "0 auto", minHeight: "90vh" }}
    >
      <div>
        <h1 className="text-2xl text-black dark:text-white font-bold">
          All Blogs
        </h1>
        <p className="text-center text-sx mt-5">
          Writing is not merely an act of putting words on paper; it's a journey
          of exploration and expression
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mt-10">
      {loading ? (
        <span className="loading loading-bars loading-lg"></span>
      ) : (
        heroBlogs &&
        heroBlogs.reverse().map((blog) => (
          <Link to={`/image/${blog._id}`} key={blog._id} className="md:w-52 w-full h-auto md:h-40 relative overflow-hidden rounded-lg">
            <img className="w-full h-full object-cover" src={blog.blogPost} alt={blog.title} />
            <div className="absolute bottom-2 left-4">
              <p className="font-semibold capitalize">{blog.title}</p>
              <p className="font-semibold capitalize">{blog.category}</p>
            </div>
          </Link>
        ))
      )}
      </div>
    </div>
  );
}

export default Blogs;
