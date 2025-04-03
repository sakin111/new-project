import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const AddSlider = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const {axiosSecure }= useAxiosSecure();

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bfknmdvs"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "dmbf41o2r"); // Replace with your Cloudinary cloud name

    try {
      setIsUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dmbf41o2r/image/upload`,
        formData
      );
      setImageUrl(response.data.secure_url); // Store the image URL
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!imageUrl) {
      alert("Please upload an image first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosSecure.post("/sliderData", {
        dataForm: { ...data, imageUrl },
      });

    
      if (response.data.insertedId) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "slider Added to the Database",
          showConfirmButton: false,
          timer: 1500,
        });
        reset(); // Reset the form
        setImageUrl(""); // Clear the image URL
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle image file change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImageToCloudinary(file);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-6 bg-white rounded-lg shadow-md md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Slide</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description", { required: true })}
            rows="3"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        {/* Category Field (Dropdown) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register("category", { required: true })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Grocery">Grocery</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
            <option value="Books">Books</option>
            <option value="Toys">Toys</option>
            <option value="Sports">Sports</option>
            <option value="Beauty">Beauty</option>
            <option value="Beauty">Luxury</option>
          </select>
        </div>

        {/* Price Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="text"
            {...register("price")}
            step="0.01"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Select Field for Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register("status", { required: true })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="New">New</option>
            <option value="Empty">Empty</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {isUploading && <p className="text-sm text-gray-500">Uploading image...</p>}
          {imageUrl && (
            <div className="mt-2 flex justify-center">
              <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSlider;
