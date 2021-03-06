import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/profile-picture-1.jpg";
import { isAuthenticated, signout } from "../auth";
import menuImage from "../assets/Capture.PNG";
// TODO:
// underline the text on respective to pages

const styles = {
  under: {
    textDecorationLine: "underline",
    color: "blue",
  },
};

function Menu({ val = 0, main = true }) {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [menu, setMenu] = useState(true);

  const singMeOut = () => {
    signout(() => {
      navigate("/");
    });
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
  const [flag, setFlag] = useState(1);
  if (windowDimensions.width < 716 && flag) {
    setMenu(false);
    setFlag(0);
  }

  return (
    <div>
      <nav className="bg-white relative border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex">
            <img src={menuImage} className="w-12 rounded-full" />
            {/* <svg
              className="mr-3 h-10"
              viewBox="0 0 52 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z"
                fill="#76A9FA"
              ></path>
              <path
                d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z"
                fill="#A4CAFE"
              ></path>
              <path
                d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z"
                fill="#1C64F2"
              ></path>
  </svg>*/}
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
              <p className="text-2xl font-bold">BlogTron</p>
            </span>
          </Link>
          <div className="flex items-center md:order-2 relative">
            {!isAuthenticated() && (
              <div>
                <Link to="/signin">Signin</Link>/
                <Link to="/signup">Signup</Link>
              </div>
            )}
            {isAuthenticated() && (
              <>
                <button
                  type="button"
                  className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown"
                  onClick={() => {
                    setDropdown(!dropdown);
                  }}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      isAuthenticated().user.photo === ""
                        ? image
                        : isAuthenticated().user.photo
                    }
                    alt="user photo"
                  />
                </button>

                {dropdown && (
                  <div
                    className="absolute right-0 top-0 mt-12 z-50 w-36 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown"
                  >
                    <div className="py-3 px-4">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {isAuthenticated().user.penname}
                      </span>
                      <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                        {/*name@flowbite.com*/}
                      </span>
                    </div>
                    <ul className="py-1" aria-labelledby="dropdown">
                      <li>
                        <Link
                          to={"/author/" + isAuthenticated().user.penname}
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/createblog"
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Write Blog
                        </Link>
                      </li>
                      {isAuthenticated().user.role === 1 && (
                        <li>
                          <Link
                            to="/edittag"
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Edit Tag
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          to="/"
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          onClick={singMeOut}
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
            {main && (
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
                onClick={(e) => {
                  e.preventDefault();
                  setMenu(!menu);
                }}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            )}
          </div>
          {menu && (
            <div
              className=" justify-between items-center w-full md:flex md:w-auto md:order-1"
              id="mobile-menu-2"
            >
              {main && (
                <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                  <li>
                    <Link
                      to="/"
                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      aria-current="page"
                      style={val == 0 ? styles.under : {}}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tags"
                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      style={val == 1 ? styles.under : {}}
                    >
                      Tags
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/reviews"
                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      style={val == 2 ? styles.under : {}}
                    >
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/gaming"
                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      style={val == 3 ? styles.under : {}}
                    >
                      Gaming
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      style={val == 4 ? styles.under : {}}
                    >
                      About
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Menu;
