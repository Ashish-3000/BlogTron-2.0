import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer.jsx";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./Tools.js";

const EDITTOR_HOLDER_ID = "editorjs";
function BlogTemplate() {
  const blog = useLocation().state.blog;
  const [editorData, setEditorData] = useState({});
  const [data, setData] = useState({
    title: "",
    photo: "",
    name: "",
    tags: [],
  });

  const ReactEditorJS = createReactEditorJS();

  const { title, photo, name, tags } = data;

  if (title === "") {
    setData({
      title: blog.title,
      photo: blog.photo,
      tags: blog.tags,
    });
    setEditorData(blog.content[0]);
  }

  return (
    <div>
      <Menu />
      <div className="min-h-screen">
        <div className="w-11/12 lg:w-9/12 md:w-10/12 m-auto">
          <p className="lg:text-4xl text-2xl text-center font-bold">{title}</p>
          {photo != "" && (
            <img src={photo} className="mt-3 lg:w-10/12 lg:h-96 m-auto" />
          )}
          <div className="text-right">
            <div className="lg:mr-32">
              <span className="text-orange-700 font-bold">Author:</span>
              <Link to={"/author/" + blog.penname}> {" " + blog.penname}</Link>
            </div>
          </div>
          <div>
            <ReactEditorJS
              readOnly={true}
              defaultValue={editorData}
              tools={EDITOR_JS_TOOLS}
            />
            {/*<div className="" id={EDITTOR_HOLDER_ID}></div>*/}
          </div>
        </div>
        <div className="lg:w-5/12 md:5/12 w-11/12 m-auto">
          {tags.length != 0 &&
            tags.map((tag, key) => {
              return (
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {tag}
                  </span>
                </button>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BlogTemplate;
