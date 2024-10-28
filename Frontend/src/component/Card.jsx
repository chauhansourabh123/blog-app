import React from "react";
import { Link } from "react-router-dom"

function Card({ blog }) {
  return (
    <>
      <Link to={`/image/${blog._id}`} className="card w-full cursor-pointer transition-transform hover:scale-105 bg-white dark:bg-gray-900 md:w-72 hover:shadow-2xl duration-200">
        <figure>
          <img src={blog.blogPost} alt="Shoes" className="w-full md:w-72 h-44 object-cover"/>
        </figure>
        <div className="p-4 flex gap-3 items-center">
          <img
            className="w-12 h-12 border-2 border-red-800 rounded-full object-cover"
            src={blog.createdBy.avatar}
            alt="Shoes"
          />
          <div>
            <h2 className="card-title capitalize text-black dark:text-white">{blog.createdBy.name}</h2>
            <h3 className="capitalize text-black dark:text-white">{blog.title}</h3>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
