import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BlogBox from "./BlogBox";
import { getTaggedBlogs } from "./helper/tagapicalls";
import Menu from "./Menu";

function TaggedBlogs() {
  //   const queryParams = useLocation().pathname;
  //   const tagName = queryParams.split("/")[2];
  const [data, setData] = useState({
    blogs: [],
    success: false,
  });
  const { blogs, success, msg } = data;
  const tag = useLocation().state;
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    getTaggedBlogs(tag.tag).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.message) {
        setMessage(data.message);
      } else {
        setData({
          blogs: data,
          success: true,
        });
      }
    });
  }, []);
  return (
    <div>
      <Menu val={1} />
      <h1 className="text-center text-3xl font-bold"> {tag.tag}</h1>
      <div>
        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
        {!blogs.length && (
          <div className="text-center">Unable to find blogs for this tag</div>
        )}
        <div className="lg:grid lg:grid-cols-4 mx-16 gap-5">
          {success &&
            blogs.map((blog, key) => {
              return <BlogBox key="key" blog={blog} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default TaggedBlogs;
