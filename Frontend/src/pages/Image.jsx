import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Image() {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true); // Start as loading
  const [error, setError] = useState(null); // State for error handling

  const { id } = useParams();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/get-blog/${id}`, { withCredentials: true });
        setBlog(res.data.data);
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchImage();
  }, [id]);

  if (loading) {
    return(
      <div className="flex items-center justify-center">
         <span className="loading loading-bars loading-lg"></span>
      </div>
    ); 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="min-h-[70vh] flex flex-col lg:flex-row mt-10 justify-center md:p-20 gap-8 p-4">
      <div className="lg:w-[600px] rounded-md w-full overflow-hidden">
        <img
          src={blog.blogPost}
          className="w-full object-cover"
          alt={blog.title}
        />
      </div>
      <div className="w-full lg:w-2/5">
        <h2 className="capitalize font-bold text-2xl text-black dark:text-white mb-4">{blog.title}</h2>
        <p className="capitalize font-semibold text-xl text-black dark:text-white mb-4">{blog.category}</p>
        <p className="capitalize text-md text-black dark:text-white mb-2">{blog.about}</p>
      </div>
    </div>
  );
}

export default Image;
