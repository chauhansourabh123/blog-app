import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdNavigateBefore, MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { RxDropdownMenu } from "react-icons/rx";
import { Context } from "../context/Context.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(Context);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedMode);
    if (storedMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
        withCredentials: true,
      });

      setLoggedInUser(null);
      localStorage.removeItem("loggedInUser");

      toast.success("Logout successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error("Logout error");
    }
  };

  return (
    <div className="flex items-center sticky top-0 left-0 justify-between px-2 md:px-10 py-4 shadow-lg bg-white dark:bg-gray-900 z-50">
      <div>
        <h1 className="text-black dark:text-white font-bold text-lg">
          Blog<span className="text-blue-700">App</span>
        </h1>
      </div>
      <div className="md:flex gap-6 hidden">
        <Link
          to={"/"}
          className="uppercase dark:text-white text-black text-sm font-semibold hover:text-gray-500 dark:hover:text-gray-300 duration-150"
        >
          Home
        </Link>
        <Link
          to={"/blogs"}
          className="uppercase dark:text-white text-black text-sm font-semibold hover:text-gray-500 dark:hover:text-gray-300 duration-150"
        >
          Blogs
        </Link>
        <Link
          to={"/creators"}
          className="uppercase dark:text-white text-black text-sm font-semibold hover:text-gray-500 dark:hover:text-gray-300 duration-150"
        >
          Creators
        </Link>
        <Link
          to={"/about"}
          className="uppercase dark:text-white text-black text-sm font-semibold hover:text-gray-500 dark:hover:text-gray-300 duration-150"
        >
          About
        </Link>
        <Link
          to={"/contact"}
          className="uppercase dark:text-white text-black text-sm font-semibold hover:text-gray-500 dark:hover:text-gray-300 duration-150"
        >
          Contact
        </Link>
        <Link
          to={"/profile"}
          className="uppercase dark:text-white text-black text-sm font-semibold hover:text-gray-500 dark:hover:text-gray-300 duration-150"
        >
          Profile
        </Link>
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <button
          onClick={toggleDarkMode}
          className={`p-2 text-lg ${darkMode ? "text-white" : "text-black"}`}
        >
          {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>

        {loggedInUser && loggedInUser.role === "admin" ? (
          <Link
            to={"/dashboard"}
            className="py-1 px-3 text-black dark:text-white bg-blue-700 rounded-md"
          >
            {isMobile ? <MdDashboardCustomize /> : "Dashboard"}
          </Link>
        ) : null}

        <button
          onClick={handleLogout}
          className="py-1 px-3 text-white dark:text-white bg-red-600 rounded-md hover:bg-red-700 duration-150"
        >
          {isMobile ? <BiLogOut /> : "Logout"}
        </button>
        <div className="dropdown dropdown-end md:hidden block">
          <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
            <RxDropdownMenu className="text-3xl text-black dark:text-white" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-white text-black dark:text-white dark:bg-gray-900 rounded-box z-[1] mt-5 w-52 p-2 shadow-2xl"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/blogs"}>Blogs</Link>
            </li>
            <li>
              <Link to={"/creators"}>Creators</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
