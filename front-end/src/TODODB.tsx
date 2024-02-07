/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { LuTrash2 } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineSystemUpdate } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";
import { getToken } from "./getToken";
import { apiRequest } from "./ApiRequest/apiRequest";

const todoSchema = Yup.object().shape({
  todo: Yup.string().required("Todo is required").trim(),
});

const initialValues = {
  todo: "",
};
console.log(getToken(), "getToken()");
const TodoApp = () => {
  const [todo, setTodo] = useState<any>(null);
  const [id, setId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (values: any, resetForm: any) => {
    const reqData = {
      id: id || null,
      todo: values.todo,
    };

    // const result = await axios.post("http://localhost:3000/save", reqData);
    const result = await apiRequest("/save", "post", reqData);

    if (result) {
      handleFetch();
      setId(null);
      resetForm();
      // toast.success(result?.message);
    }
  };

  const handleFetch = async (id?: string) => {
    try {
      setIsLoading(true);
      let res;
      if (id) {
        res = await axios.get(`http://localhost:3000/getTodo`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
          params: {
            id: id,
          },
        });
      } else {
        res = await axios.get("http://localhost:3000/getTodo", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
      }
      res?.data && setIsLoading(false);
      setTodo(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    const data = apiRequest("/init", "get");
    console.log(data, "data");
  };
  useEffect(() => {
    handleFetch();
    getUser();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      const res = await axios.delete(`http://localhost:3000/delete/${id}`);
      if (res) {
        handleFetch();
        setId(null);
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center w-full h-screen items-center">
      <div className="flex flex-col items-center w-1/3 min-h-[20rem] bg-[#776B5D] border-2 rounded-xl border-[#EBE3D5] shadow-2xl">
        <div className="w-3/4">
          <h1 className=" text-white mt-10 text-4xl">Todo App</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={todoSchema}
            onSubmit={(values, { resetForm }) => {
              handleFormSubmit(values, resetForm);
            }}
          >
            {({
              errors,
              values,
              handleSubmit,
              handleChange,
              setFieldValue,
              resetForm,
            }) => (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="flex items-center w-full h-[3rem] mt-5">
                    <input
                      type="text"
                      onChange={(e) => handleChange(e)}
                      value={values.todo}
                      placeholder="Enter Todo"
                      name="todo"
                      className="border-2 border-black h-[2rem]  my-5 p-4 rounded-lg flex-grow"
                      autoComplete="off"
                    />

                    <button className="ml-3 bg-none rounded-md py-2 pl-2 ">
                      {id ? (
                        <MdOutlineSystemUpdate className="text-3xl text-yellow-300" />
                      ) : (
                        <IoMdAddCircle className="text-3xl text-yellow-300" />
                      )}
                    </button>
                    {id && (
                      <button
                        className="  rounded-md py-2 pl-2 "
                        onClick={() => {
                          resetForm();
                          setId(null);
                        }}
                      >
                        <MdCancel className="text-3xl text-red-500" />
                      </button>
                    )}
                  </div>
                  {errors.todo ? (
                    <div className="text-red-500 ml-2">{errors.todo}</div>
                  ) : null}
                </form>

                <ul className="list-disc list-inside w-full">
                  {isLoading && !todo && (
                    <div className="flex justify-center  h-full mt-10">
                      <Spinner color="info" aria-label="Info spinner example" />
                    </div>
                  )}

                  {todo &&
                    !isLoading &&
                    todo?.map((item: any, index: any) => (
                      <li
                        key={index}
                        className="my-5 flex items-center  justify-between w-full"
                      >
                        <h5
                          className={`text-xl flex-grow max-w-[19rem] ml-2 text-wrap break-words  ${
                            item?.completed
                              ? "line-through text-slate-300"
                              : " text-[#F3EEEA]"
                          }`}
                        >
                          {item?.todo}
                        </h5>

                        <div className="flex items-center">
                          {!item?.completed && (
                            <>
                              <button
                                className="ml-5 bg-none rounded-md  pr-2"
                                onClick={() => {
                                  setId(item?.id);
                                  setFieldValue("todo", item?.todo);
                                }}
                              >
                                <FaRegEdit className="text-2xl text-blue-900" />
                              </button>

                              <button className=" bg-none    mx-2 rounded-full  bg-slate-500">
                                <TiTick
                                  className="text-2xl text-green-900"
                                  onClick={() => handleFetch(item?.id)}
                                />
                              </button>
                            </>
                          )}
                          <button
                            className=" bg-none rounded-md  "
                            onClick={() => handleDelete(item?.id)}
                          >
                            <LuTrash2 className="text-2xl text-red-900" />
                          </button>
                        </div>
                      </li>
                    ))}
                  {!todo && !isLoading && (
                    <h1 className="text-[#F3EEEA] ml-2">No Data Found</h1>
                  )}
                </ul>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
