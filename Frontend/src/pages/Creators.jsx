import React, { useEffect, useState } from "react";
import useHeroBlogs from "../context/HeroBlogs.jsx";
import axios from "axios";
function Creators() {
  const { heroBlogs } = useHeroBlogs();
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/all-users`,
          {
            withCredentials: true,
          }
        );
        
        setCreators(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreators();
  }, [setCreators]);

  return (
    <div
      className="max-width mt-4 p-10"
      style={{ margin: "0 auto", minHeight: "90vh" }}
    >
      <h1 className="text-black mb-10 text-xl font-semibold dark:text-white">
        Popular Created
      </h1>

      <div className="flex flex-wrap justify-center gap-2 md:gap-10">
        {creators &&
          creators.length > 0 &&
          creators.map((creator) => (
            <div
              key={creator._id}
              className="w-52 pb-4 rounded-md overflow-hidden shadow-2xl flex flex-col items-center justify-center"
            >
              <img
                className="w-full h-44 mb-6  object-cover"
                src={creator.avatar}
                alt=""
              />
              <p className="capitalize text-black dark:text-white">
                {creator.name}
              </p>
              <p className="text-black dark:text-white">{creator.email}</p>
              <p className="text-black dark:text-white">Admin</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Creators;
