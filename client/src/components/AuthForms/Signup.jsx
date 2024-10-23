import React from "react";
import { Input, Field, Label, Button } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import Spinner from "../ui/Spinner";
import Spinner from "../ui/Spinner";

const Signup = () => {
  // signup form states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // image uploading states
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const notify = (msg) => {
    toast(msg);
  };

  const uploadImage = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", picture);
    formData.append("upload_preset", "Nexus -  Chat Application");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/doi1vdkhc/image/upload",
        formData
      );
      // console.log("Cloudinary POST request response: ", response.data);

      setUploadedImageUrl(response.data.secure_url); // Get the URL of the uploaded image
      console.log("Uploaded image URL:", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      // console.log(username, email, password, confirmPassword, picture);

      if (password !== confirmPassword) {
        notify("Passwords do not match. Please try again❌");
        return;
      }

      if (picture) await uploadImage();

      // console.log("image state before submitting the form: ", uploadedImageUrl);

      const userData = {
        name: username,
        email,
        password,
        picture: uploadedImageUrl,
      };

      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        userData
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log("Error : ", error.message);
    } finally {
      setLoading(false);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPicture("");
    }
  };
  return (
    <div className="w-full">
      <Toaster />
      {/* <Spinner /> */}
      <form onSubmit={handleSubmit}>
        <Field className="flex flex-col w-full">
          <Label>Name</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-2 border w-full"
            name="name"
            type="text"
            placeholder="Enter Your Name"
          />
        </Field>

        <Field className="flex flex-col w-full">
          <Label>Email Address</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border w-full"
            name="email"
            type="email"
            placeholder="Enter your email address"
          />
        </Field>

        <Field className="flex flex-col">
          <Label>Password</Label>
          <div className="w-full flex flex-col">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border w-full"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="self-end mt-1 p-1 text-xs bg-gray-500 text-white rounded-lg"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>

        <Field className="flex flex-col">
          <Label>Confirm Password</Label>
          <div className="w-full flex flex-col">
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 border w-full"
              name="confirmPassword" // Corrected name
              type={showConfirmPassword ? "text" : "password"} // Changed to showConfirmPassword
              placeholder="Confirm password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="self-end mt-1 p-1 text-xs bg-gray-500 text-white rounded-lg"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>

        <Field className="flex flex-col">
          <Label>Upload Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setPicture(e.target.files[0])} // Adjusted to handle file input correctly
          />
        </Field>

        <Button
          type="submit"
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 w-full my-2 text-md font-semibold text-center"
        >
          {loading ? <Spinner /> : "Signup"}

          {/* <Spinner /> */}
        </Button>
      </form>
    </div>
  );
};

export default Signup;
