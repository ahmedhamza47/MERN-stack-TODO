/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState<any>({});

  const navigate = useNavigate();
  const handleSubmit = async () => {
    // fetch("http://localhost:3000/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    await axios
      .post("http://localhost:3000/login", formData)
      .then((res) => {
        console.log(res.data, "ressssssssss");
        if (res.status === 200) {
          toast.success("User Logged in  Successfully");
          setFormData({
            email: "",
            password: "",
          });
          localStorage.setItem("token", res.data.token);
          navigate("/");
        } else {
          toast.error("User not found");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center">
        <div className="w-1/3 h-full  flex justify-center  flex-col items-center">
          <h1 className="text-3xl">Login Form</h1>
          <form
            onSubmit={(e) => {
              handleSubmit();
              e.preventDefault();
            }}
            className="w-min mt-10"
          >
            <div>
              <div className="text-left ml-2">
                <label htmlFor="username">Email</label>
              </div>
              <input
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                placeholder="Enter Username"
                name="username"
                className="border-2 border-black h-[2rem]  my-5 p-4 rounded-lg flex-grow"
                autoComplete="off"
              />
            </div>

            <div>
              <div className="text-left ml-2">
                <label htmlFor="password">Password</label>
              </div>
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                value={formData.password}
                className="border-2 border-black h-[2rem]  my-5 p-4 rounded-lg flex-grow"
                autoComplete="off"
                placeholder="Enter Password"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Login
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-5"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
