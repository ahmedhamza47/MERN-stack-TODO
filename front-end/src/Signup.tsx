/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
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

    const res = await axios.post("http://localhost:3000/signup", formData);
    console.log(res);
    if (res) {
      toast.success("User Created Successfully");
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      navigate("/login");
    }
  };
  console.log(formData, "formData");
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-1/3 h-full  flex justify-center  flex-col items-center">
        <h1 className="text-3xl">Sign Up Form</h1>
        <form
          onSubmit={(e) => {
            handleSubmit();
            e.preventDefault();
          }}
          className="w-min mt-10"
        >
          <div>
            <div className="text-left ml-2">
              <label htmlFor="username">Username</label>
            </div>
            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              value={formData.username}
              placeholder="Enter Username"
              name="username"
              className="border-2 border-black h-[2rem]  my-5 p-4 rounded-lg flex-grow"
              // autoComplete="off"
            />
          </div>
          <div>
            <div className="text-left ml-2">
              <label htmlFor="email">Email</label>
            </div>
            <input
              type="email"
              id="email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              value={formData.email}
              className="border-2 border-black h-[2rem]  my-5 p-4 rounded-lg flex-grow"
              // autoComplete="off"
              placeholder="Enter Email"
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
              // autoComplete="off"
              placeholder="Enter Password"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#bdbd9a] px-4 py-2 rounded-md text-purple-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
