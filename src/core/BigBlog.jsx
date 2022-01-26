import React, { useState } from "react";
import { deleteBlog } from "../core/helper/blogapicalls";
import { Link } from "react-router-dom";

function BigBlog({ id, blog, edit = false }) {
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
    <div id={id} className="col-span-1 w-full">
      <div className="  bg-white m-3  border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div>
          <div className="p-3">
            <Link to={"/blog/" + blog.title} state={{ blog: blog }}>
              <img className="h-96 w-full" src={blog.photo} alt="" />
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {blog.title}
              </h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigBlog;
