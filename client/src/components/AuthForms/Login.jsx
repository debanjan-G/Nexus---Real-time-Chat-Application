import React from "react";
import { Input, Field, Label, Button } from "@headlessui/react";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Logging you in...");
  };

  const useGuestCredentials = () => {
    setEmail("guest@email.com");
    setPassword("secret1010");
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <Field className="flex flex-col w-full">
          <Label>Email Address</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" p-2 border w-full"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
          />
        </Field>
        <Field className="flex flex-col">
          <Label>Password</Label>
          <div className="w-full flex flex-col">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" p-2 border w-full"
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
        <Button
          type="submit"
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 w-full my-2 text-md font-semibold"
        >
          Login
        </Button>
        <Button
          type="submit"
          onClick={useGuestCredentials}
          className="rounded bg-green-500 py-2 px-4 text-white data-[hover]:bg-green-400 data-[active]:bg-green-700 w-full text-md font-semibold"
        >
          Get Guest User Credentials
        </Button>
      </form>
    </div>
  );
};

export default Login;
