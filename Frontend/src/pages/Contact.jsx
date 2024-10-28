import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

function Contact() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const messageData = {
        name: data.name,
        email: data.email,
        message: data.message,
      };

      const response = await axios.post(
        `http://localhost:5000/api/v1/message/send`,
        messageData,
        { withCredentials: true }
      );
      toast.success("Message send successfully", { autoClose: 1500 });
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Message send failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="p-4 shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-black dark:text-white">
          Contact Us
        </h1>
        <div className="gap-10 mt-6 md:flex">
          <div className="min-w-80">
            <h2 className="text-xl font-bold mt-6 text-black dark:text-white">
              Send us a message
            </h2>
            {loading ? (
              <span className="loading loading-bars loading-lg"></span>
            ) : (
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="flex flex-col gap-3 mt-4"
              >
                <input
                  className="p-2 rounded-lg dark:bg-gray-800 bg-gray-100"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}

                <input
                  className="p-2 rounded-lg dark:bg-gray-800 bg-gray-100"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email is not valid",
                    },
                  })}
                  placeholder="Your Email"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                <textarea
                  className="p-2 rounded-lg dark:bg-gray-800 bg-gray-100 resize-none"
                  {...register("message", { required: "Message is required" })}
                  placeholder="Your message"
                />
                {errors.message && (
                  <p className="text-red-500">{errors.message.message}</p>
                )}

                <input
                  type="submit"
                  value="Submit"
                  className="bg-blue-900 p-2 font-semibold text-lg rounded-lg cursor-pointer hover:bg-blue-700 duration-150"
                />
              </form>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold mt-6 text-black dark:text-white">
              Contact Information
            </h2>
            <div className="flex items-center gap-2 mt-4">
              <FaPhone />
              <p>+91 8273395555</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <MdEmail />
              <p>demo@learncoding.com</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <FaLocationDot />
              <p>Delhi, NCR, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
