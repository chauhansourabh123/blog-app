import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context.jsx";
import { toast } from "react-toastify";

function Signup() {
  const { setLoggedInUser } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      reset();
      setLoggedInUser(res.data.data);
      toast.success("Register successfully");
      setTimeout(() => {
        navigate("/");
      }, 1500);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isLoading ? (
        <span className="loading loading-bars loading-lg"></span>
      ) : (
        <div className="w-96 bg-white shadow-2xl p-4">
          <h1 className="text-black text-center text-xl font-bold">
            Blog<span className="text-blue-700">App</span>
          </h1>
          <h2 className="text-black font-semibold text-lg mt-4">Register</h2>

          <form
            className="w-full mt-6"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <select
              {...register("role", { required: true })}
              className="w-full p-2 bg-white text-black rounded-lg border border-gray-700"
            >
              <option value="">Select Role</option>
              <option value="user">Reader</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <span className="text-red-500">Role is required</span>
            )}

            <input
              type="text"
              {...register("name", { required: true })}
              className="mt-4 w-full border border-gray-700 p-2 rounded-lg bg-white text-black"
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}

            <input
              type="email"
              {...register("email", { required: true })}
              className="mt-4 w-full border border-gray-700 p-2 rounded-lg bg-white text-black"
              placeholder="Enter your Email"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}

            <input
              type="password"
              {...register("password", { required: true })}
              className="mt-4 border border-gray-700 w-full p-2 rounded-lg bg-white text-black"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}

            <input
              type="file"
              {...register("avatar", { required: true })}
              className="mt-4 w-full border border-gray-700 p-2 rounded-lg bg-white text-black"
            />
            {errors.avatar && (
              <span className="text-red-500">Avatar is required</span>
            )}

            <input
              type="submit"
              value="Submit"
              className="mt-4 w-full p-2 rounded-lg bg-blue-800 text-white font-semibold cursor-pointer"
            />
          </form>

          <p className="text-center mt-4 text-black">
            Already Registered{" "}
            <span className="text-blue-700">
              <Link to={"/login"}>Login now</Link>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Signup;
