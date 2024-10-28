import React, {useState, useEffect} from "react";
import useHeroBlogs from "../context/HeroBlogs.jsx";
import axios from "axios";

function Creater() {

  const [popularCreater, setPopularCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/user/all-users`,
          {
            withCredentials: true,
          }
        );
        
        setPopularCreators(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreators();
  }, [setPopularCreators]);

  return (
    <div className="mt-10">
      <h1 className="text-black mb-10 text-xl font-semibold dark:text-white">
        Popular Created
      </h1>

      <div className="flex flex-wrap justify-center gap-2 md:gap-10">
        {popularCreater &&
          popularCreater.length > 0 &&
          popularCreater.slice(0, 4).map((creater) => (
            <div key={creater._id} className="w-52 flex flex-col items-center justify-center">
              <img
                className="w-44 h-44 rounded-full object-cover border-2 border-gray-600"
                src={creater.avatar}
                alt=""
              />
              <p className="capitalize">{creater.name}</p>
              <p>Author</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Creater;
