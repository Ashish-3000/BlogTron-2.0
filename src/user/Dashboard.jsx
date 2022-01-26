import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
import BlogBox from "../core/BlogBox";
import { deleteBlog } from "../core/helper/blogapicalls";
import Menu from "../core/Menu";
import AuthorBox from "./AuthorBox";
import { getAuthorBlog } from "./helper/userapicalls";
import Footer from "../core/Footer";

// TODO:get all the user details
function Dashboard() {
  const queryParams = useLocation().pathname;
  const author = queryParams.split("/")[2];
  const [details, setDetails] = useState({
    user: {},
    blogs: {},
    success: false,
  });
  const { user, blogs, success } = details;
  const [error, setError] = useState("");

  useEffect(() => {
    getAuthorBlog(author).then((data) => {
      if (data.blogs.length === 0) {
        //navigate to page 404 user not found
        setError("No blogs have been found");
        setDetails({
          user: data.user,
          blogs: [],
          success: true,
        });
      } else {
        setDetails({
          user: data.user,
          blogs: data.blogs,
          success: true,
        });
      }
    });
  }, [author]);

  const [option, setOption] = useState(2);

  const removeBlog = (id) => {
    deleteBlog(id)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Menu />
      <div className="min-h-screen lg:grid lg:w-11/12 w-11/12 m-auto lg:gap-3 lg:grid-cols-4">
        <div className="lg:col-span-1 mb-3">
          {success && <AuthorBox user={user} flag={1} />}
          <div className="mt-4 relative w-full text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {isAuthenticated() && (
              <button
                type="button"
                className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium  border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                style={option === 1 ? styles.boundary : {}}
                onClick={(e) => {
                  e.preventDefault();
                  setOption(1);
                }}
              >
                <svg
                  className="mr-2 w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Saved Blogs
              </button>
            )}
            <button
              type="button"
              className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              style={option === 2 ? styles.boundary : {}}
              onClick={(e) => {
                e.preventDefault();
                setOption(2);
              }}
            >
              <svg
                className="mr-2 w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
              </svg>
              Published Blogs
            </button>
            {isAuthenticated() && (
              <button
                type="button"
                className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              >
                <svg
                  className="mr-2 w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <Link to="/createblog">Write Blog</Link>
              </button>
            )}
          </div>
        </div>
        <div className="col-span-3 ">
          <div className="text-center">{error}</div>
          <div className="grid w-full  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 lg:gap-5  justify-items-center items-center gap-3">
            {success &&
              option === 1 &&
              blogs.map((blog, key) => {
                if (blog.saved == 1)
                  return <BlogBox key={key} blog={blog} edit={1} />;
              })}
            {success &&
              option === 2 &&
              blogs.map((blog, key) => {
                if (blog.saved == 0)
                  return <BlogBox key={key} blog={blog} edit={1} />;
              })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;

const styles = {
  boundary: { color: "blue", border: "2px solid blue" },
};
