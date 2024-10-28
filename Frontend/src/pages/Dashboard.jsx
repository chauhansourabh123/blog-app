import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context.jsx";
import Button from "../component/Button.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import useUserBlog from "../context/useUserBlog.js";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Dashboard() {
  const [show, setShow] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(Context);
  const { myblogs } = useUserBlog();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser || loggedInUser.role !== "admin") {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get(`http://localhost:5000/api/v1/user/logout`, {
        withCredentials: true,
      });
      setLoggedInUser(null);
      localStorage.removeItem("loggedInUser");
      toast.success("Logout successfully", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Logout error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/blog/delete/${id}`, {
        withCredentials: true,
      });
      toast("Blog deleted", { autoClose: 1500 });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`fixed top-0 left-0 h-full bg-black w-64 transition-transform duration-300 transform ${
          show ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <button
          className="md:hidden self-start p-4 z-50"
          onClick={() => setShow(!show)}
        >
          {show ? <FaTimes /> : <FaBars />}
        </button>
        <div className="flex justify-center flex-col items-center mt-10">
          <img
            className="w-20 h-20 object-cover rounded-full"
            src={loggedInUser?.avatar}
            alt="userAvatar"
          />
          <p className="capitalize font-semibold">{loggedInUser?.name}</p>
        </div>
        <div className="mt-6 flex flex-col items-center p-6 gap-y-5">
          <Button color={"bg-green-700"} path={"/dashboard"} name="My Blogs" />
          <Button
            color={"bg-blue-700"}
            path={"/create-blogs"}
            name="Create Blogs"
          />
          <Button color={"bg-purple-700"} path={"/profile"} name="My profile" />
          <Button color={"bg-red-700"} path={"/"} name="Home" />
          <button
            onClick={handleLogout}
            className="bg-yellow-700 w-full py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
      <div>
        <button
          className="md:hidden self-start p-4 z-50"
          onClick={() => setShow(!show)}
        >
          {show ? <FaTimes /> : <FaBars />}
        </button>
        <div className="p-4 w-full md:w-5/6 flex justify-center flex-wrap gap-y-10 gap-x-4 h-screen overflow-auto md:ml-64">
          {myblogs &&
            myblogs.length > 0 &&
            myblogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/image/${blog._id}`}
                className="sm:w-80 md:w-96 h-80 w-full rounded-lg overflow-hidden shadow-2xl"
              >
                <img
                  className="w-full h-44 object-cover"
                  src={blog.blogPost}
                  alt={blog.title}
                />
                <div className="px-2 py-4 flex flex-col gap-1">
                  <p className="capitalize text-black dark:text-white">{blog.category}</p>
                  <p className="capitalize text-black dark:text-white">{blog.title}</p>
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="border text-red-700 border-red-700 text-lg p-2 rounded-lg"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
