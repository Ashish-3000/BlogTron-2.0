import React, { useState } from "react";
import { deleteBlog } from "../core/helper/blogapicalls";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

const styles = { height: { height: "16rem" } };

function BlogBox({ id, blog, edit = false }) {
  const [error, setError] = useState("");
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
    <div
      id={id}
      className="col-span-1 w-full h-56"
      style={edit === 1 ? styles.height : {}}
    >
      <div className="relative bg-white ml-1 h-full mr-1 border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div>
          <div className="p-2">
            <Link to={"/blog/" + blog.title} state={{ blog: blog }}>
              <img className="h-32 w-full" src={blog.photo} alt="" />
              <h5 className="mb-2 h-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden">
                {blog.title}
              </h5>
            </Link>
          </div>
          {isAuthenticated() && edit && (
            <div className="mb-3 absolute bottom-0">
              <Link
                to={"/editblog/" + blog.title}
                state={{ blogdata: blog }}
                className="inline-flex ml-3  items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </Link>
              <button
                // state={{ blogdata: blog }}
                className="inline-flex ml-3  items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => {
                  e.preventDefault();
                  removeBlog(blog._id);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogBox;
