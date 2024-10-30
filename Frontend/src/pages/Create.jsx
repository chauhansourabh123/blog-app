import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Create() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("about", data.about);
      formData.append("blogPost", data.blogPost[0]);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/blog/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.data.message || "Blog created");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setImagePreview(null);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-2 md:p-10">
      {loading ? (
        <span className="loading loading-bars loading-lg"></span>
      ) : (
        <form
          className="md:w-2/5 w-full px-4 py-6 shadow-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center text-2xl mb-4 font-bold">Create Blog</h2>

          <label htmlFor="category">Category</label>
          <select
            className="w-full rounded-lg p-2 mt-2"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select Category</option>
            <option value="God">God</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Fashion">Fashion</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}

          <div className="mt-4">
            <label htmlFor="title">Title</label>
            <input
              placeholder="Enter your blog title"
              className="w-full p-2 rounded-lg"
              type="text"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="about">About</label>
            <textarea
              placeholder="Write your content"
              className="w-full resize-none p-2 rounded-lg"
              {...register("about", { required: "About is required" })}
              rows={4}
            ></textarea>
            {errors.about && (
              <p className="text-red-500">{errors.about.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="file">Image</label>
            <input
              type="file"
              name="blogPost"
              id="file"
              className="w-full bg-gray-600 p-2"
              {...register("blogPost")}
              onChange={handleFileChange}
            />
          </div>

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-52 object-cover rounded-lg"
              />
            </div>
          )}

          <input
            type="submit"
            value="Post Blog"
            className="w-full mt-6 cursor-pointer bg-blue-700 p-2 rounded-lg"
          />
        </form>
      )}
    </div>
  );
}

export default Create;
