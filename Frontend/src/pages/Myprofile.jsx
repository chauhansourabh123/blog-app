import React, { useContext } from "react";
import { Context } from "../context/Context.jsx";
import axios from "axios";
function Myprofile() {
  const { loggedInUser, setLoggedInUser } = useContext(Context);

  const handleDelte = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete`, {
        withCredentials: true,
      });
      setLoggedInUser(null);
      localStorage.removeItem("loggedInUser");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-96 flex flex-col items-center justify-center p-4 shadow-2xl">
        <img
          className="w-28 h-28 rounded-full object-cover"
          src={loggedInUser.avatar}
          alt=""
        />
        <h1 className="mt-6 font-semibold text-black dark:text-white capitalize text-xl">
          {loggedInUser.name}
        </h1>
        <p className="text-black dark:text-white mt-2">{loggedInUser.email}</p>
        <p className="capitalize text-black dark:text-white mt-2">
          Role: {loggedInUser.role}
        </p>
        <button
          onClick={handleDelte}
          className="mt-8 bg-red-600 p-2 font-semibold rounded-lg hover:bg-red-700 duration-200"
        >
          Delete account
        </button>
      </div>
    </div>
  );
}

export default Myprofile;
