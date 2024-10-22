import React from "react";
import { Input, Field, Label, Button } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const [isNotify, setIsNotify] = useState(false);

  const notify = (msg) => {
    toast(msg);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      console.log(username, email, password, confirmPassword, picture);

      if (password !== confirmPassword) {
        notify("❌Passwords do not match. Please try again.");
      }

      const userData = {
        name: username,
        email,
        password,
        picture,
      };

      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        userData
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error : ", error.message);
    }
  };
  return (
    <div className="w-full">
      <Toaster />
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
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 w-full my-2 text-md font-semibold"
        >
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Signup;
