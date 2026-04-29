"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateUserApi } from "@/lib/api/usersApi";
import { toast } from "sonner";

const EditProfileForm = () => {
  const { user, token, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const dataToSend = {};

      if (formData.name.trim()) {
        dataToSend.name = formData.name.trim();
      }

      if (formData.username.trim()) {
        dataToSend.username = formData.username.trim();
      }

      if (formData.email.trim()) {
        dataToSend.email = formData.email.trim();
      }

      if (formData.password.trim()) {
        dataToSend.password = formData.password.trim();
      }

      const updatedUser = await updateUserApi(dataToSend, token);

      updateUser(updatedUser);

      console.log("Updated user:", updatedUser);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-white rounded-lg shadow-md"
    >
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded-pill ring-1 ring-primary ring-opacity-50"
      />

      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full p-2 border rounded-pill ring-1 ring-primary ring-opacity-50"
      />

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded-pill ring-1 ring-primary ring-opacity-50"
      />

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="New password optional"
        className="w-full p-2 border rounded-pill ring-1 ring-primary ring-opacity-50"
      />

      <button
        disabled={loading}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default EditProfileForm;
