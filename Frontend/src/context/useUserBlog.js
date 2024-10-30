import axios from "axios";
import React, { useEffect, useState } from "react";

function useUserBlog() {
  const [myblogs, setMyblogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/blog/my-blogs`,
          { withCredentials: true }
        );
        setMyblogs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  return { myblogs };
}

export default useUserBlog;
