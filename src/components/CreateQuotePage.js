import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const CreateQuotePage = () => {
  const authToken = localStorage.getItem("authToken");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm();
  const [mediaUrl, setMediaUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file) => {
    if (!file || file.length === 0) return;

    setUploading(true);
    clearErrors("image");
    const formData = new FormData();
    formData.append("file", file[0]);

    try {
      const response = await axios.post(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        formData
      );
      if (response.status === 200) {
        setMediaUrl(response.data[0].url);

        toast("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      setError("image", {
        type: "manual",
        message: "Failed to upload image. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!mediaUrl) {
      setError("image", {
        type: "manual",
        message: "Please upload an image before submitting.",
      });
      return;
    }

    const payload = { ...data, mediaUrl };
    try {
      await axios.post(
        "https://assignment.stage.crafto.app/postQuote",
        payload,
        {
          headers: { Authorization: authToken },
        }
      );
      toast("Quote created successfully!");
      reset();
      setMediaUrl("");
    } catch (error) {
      console.error("Failed to create quote:", error);
      alert("Failed to create quote. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create a New Quote
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Quote Text
            </label>
            <textarea
              {...register("text", {
                required: "Quote text is required",
                maxLength: {
                  value: 200,
                  message: "Quote must be less than 200 characters",
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            {errors.text && (
              <p className="text-red-500 text-sm">{errors.text.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e.target.files)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {uploading && (
              <p className="text-blue-500 text-sm mt-1">Uploading image...</p>
            )}
            {mediaUrl && (
              <img
                src={mediaUrl}
                alt="Uploaded Preview"
                className="w-full h-40 object-cover mt-4 rounded-lg"
              />
            )}
            {errors.image && (
              <p className="text-red-500 text-sm mt-2">
                {errors.image.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Create Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuotePage;
