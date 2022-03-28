import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signin, authenticate } from "../auth";
import Menu from "../core/Menu";
import image from "../assets/SignIn.png";
import { Link } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { email, name, penname, password, error, success } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    signin(values)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, ["error"]: data.error });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              success: true,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const successMessage = () => {
    return <Navigate to="/" />;
  };

  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [flag, setFlag] = useState(true);
  if (windowDimensions.width < 716 && flag) {
    setFlag(false);
  }

  return (
    <div className="flex flex-col lg:flex-row md:flex-row h-screen items-center">
      {flag && (
        <img
          src={image}
          onClick={() => {
            navigate("/");
          }}
          className="object-fill w-3/12 h-screen cursor-pointer"
        />
      )}
      {!flag && (
        <p className="text-center text-2xl my-4 cursor-pointer font-bold">
          BLOGTRON
        </p>
      )}
      <form className="w-8/12  m-auto">
        {error !== "" && <div className="">{error}</div>}
        <div className="mb-6">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            placeholder="name@flowbite.com"
            value={email}
            onChange={handleChange("email")}
          />
        </div>

        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            placeholder="*****"
            value={password}
            onChange={handleChange("password")}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onSubmit}
        >
          Sign In
        </button>
        <div className="mt-3 text-sm">
          <label
            for="terms"
            className="font-medium text-gray-900 dark:text-gray-300"
          >
            <Link
              to="/signup"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              New User
            </Link>
          </label>
        </div>
      </form>
      {success && successMessage()}
    </div>
  );
}

export default Signin;
