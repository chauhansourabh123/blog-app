import React, { useEffect, useState } from "react";
import axios from "axios";

const useHeroBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [heroBlogs, setHeroBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/get-blogs`, {withCredentials: true});

        setHeroBlogs(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  return { heroBlogs, loading };
};

export default useHeroBlogs;
