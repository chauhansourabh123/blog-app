import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context.jsx";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const newData = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/user/login`,
        newData,
        { withCredentials: true }
      );
      setLoggedInUser(res.data.data);
      toast.success("Login successfully", {autoClose: 1000});
      setTimeout(() => {
        navigate("/");
      }, 1500);
      reset();
    } catch (error) {
      toast.error("Email or Password is incorrect", {autoClose: 1200});
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-96 bg-white shadow-2xl p-4">
        <h1 className="text-black text-center text-xl font-bold">
          Blog<span className="text-blue-700">App</span>
        </h1>
        <h2 className="text-black font-semibold text-lg mt-4">Login</h2>

        <form className="w-full mt-6" onSubmit={handleSubmit(onSubmit)}>
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
            type="submit"
            value="Submit"
            className="mt-4 w-full p-2 rounded-lg bg-blue-800 text-white font-semibold cursor-pointer"
          />
        </form>

        <p className="text-center mt-4 text-black">
          Not Registered?{" "}
          <span className="text-blue-700">
            <Link to={"/signup"}>Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
