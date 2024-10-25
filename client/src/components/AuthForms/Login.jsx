import React from "react";
import { Input, Field, Label, Button } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notify = (msg) => {
    toast(msg);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        loginData
      );

      console.log(response.data);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("showLoginSuccess", "true");
      // console.log(response.data);

      //saving current user details to localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setLoading(false);
      // setTimeout(() => navigate("/chats"), 1000);
      navigate("/chats");
    }

    console.log("Logging you in...");
  };

  const setGuestCredentials = () => {
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
          {loading ? <Spinner /> : "Login"}
        </Button>
        <Button
          type="button"
          onClick={setGuestCredentials}
          className="rounded bg-green-500 py-2 px-4 text-white data-[hover]:bg-green-400 data-[active]:bg-green-700 w-full text-md font-semibold"
        >
          Get Guest User Credentials
        </Button>
      </form>
    </div>
  );
};

export default Login;
