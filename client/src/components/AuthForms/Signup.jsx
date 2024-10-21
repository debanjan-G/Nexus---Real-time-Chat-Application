import React from "react";
import { Input, Field, Label, Button } from "@headlessui/react";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("signing you up...");
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <Field className="flex flex-col w-full">
          <Label>Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
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
