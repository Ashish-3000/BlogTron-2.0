import React, { useState, useEffect } from "react";
import BlogBox from "./BlogBox";
import { getAllBlogs } from "./helper/blogapicalls";
import Menu from "./Menu";
import BigBlog from "./BigBlog";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

function Home() {
  const [details, setDetails] = useState({
    blog: [],
    success: false,
  });
  const { blog, success } = details;
  const [error, setError] = useState("");
  useEffect(() => {
    getAllBlogs().then((data) => {
      if (data.error) {
        setError(data.error);
      } else
        setDetails({
          blog: data,
          success: true,
        });
    });
  }, []);
  const [flag, setFlag] = useState(true);
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
  if (windowDimensions.width < 900 && flag) {
    setFlag(false);
  }

  return (
    <div>
      <Menu />
      <div className="min-h-screen">
        <div className="text-center"> {error}</div>
        <div className="lg:grid lg:grid-cols-5 lg:gap-1 w-full">
          <div className="col-span-3 h-full">
            {success && <BigBlog blog={blog[0]} />}
          </div>
          <div
            className="col-span-2 lg:grid lg:grid-cols-2
           md:grid md:grid-cols-2 sm:grid
            sm:grid-cols-2 md:gap-3 sm:gap-3 lg:gap-1 lg:w-full
             sm:w-10/12 md:w-10/12 m-auto justify-items-center items-center"
          >
            {success &&
              blog.map((blog, key) => {
                if (key > 0 && key < 5) {
                  return <BlogBox key={key} blog={blog} />;
                }
              })}
          </div>
        </div>
        <h1 className="text-center font-bold text-2xl mt-5 mb-5">
          Latest Articles...
        </h1>
        <div className="m-auto lg:ml-48 lg:mr-48 lg:grid lg:grid-cols-4 gap-4 ">
          {flag &&
            success &&
            blog.map((blog, key) => {
              if (key > 4) {
                return <BlogBox key={key} blog={blog} />;
              }
            })}
          <div className="w-10/12 m-auto">
            {!flag &&
              success &&
              blog.map((blog, key) => {
                if (key > 4) {
                  return (
                    <Link
                      key={key}
                      to={"/blog/" + blog.title}
                      className="flex mt-3 flex-row justify-items-center  items-center h-24  bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <img
                        className="object-cover w-24 h-full"
                        src={blog.photo}
                        alt=""
                      />
                      <h5
                        className="m-2 text-xl overflow-hidden
                   font-bold tracking-tight text-gray-900 dark:text-white"
                      >
                        {blog.title}
                      </h5>
                    </Link>
                  );
                }
              })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
