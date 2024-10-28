import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useHeroBlogs from "../context/HeroBlogs.jsx";

function Trending() {
  const { heroBlogs, loading } = useHeroBlogs();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold text-black dark:text-white">
        Trending
      </h1>
      <div className="mt-6">
        <Carousel responsive={responsive}>
          {loading ? (
            <span className="loading loading-bars loading-lg"></span>
          ) : (
            heroBlogs &&
            heroBlogs.reverse().slice(0,8).map((blog) => (
              <div
                key={blog._id}
                className="p-4 w-full md:w-60 border border-gray-700 rounded-md relative"
              >
                <p className="absolute top-6 left-6 bg-blue-700 px-4 rounded-xl capitalize font-semibold">
                  {blog.category}
                </p>
                <img
                  className="rounded-md h-44 w-full object-cover"
                  src={blog.blogPost}
                  alt="blogpost"
                />

                <div className="mt-5">
                  <p className="capitalize text-black dark:text-white">
                    {blog.title}
                  </p>
                  <div className="mt-4 flex gap-4 items-center">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src={blog.createdBy.avatar}
                      alt="adminImage"
                    />
                    <p className="capitalize text-black dark:text-white">
                      {blog.createdBy.name}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default Trending;
