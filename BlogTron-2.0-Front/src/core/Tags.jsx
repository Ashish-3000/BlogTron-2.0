import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { getAllTags } from "./helper/tagapicalls";
import { Link } from "react-router-dom";
import Footer from "./Footer";

// getAllTags
function Tags() {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    getAllTags()
      .then((data) => {
        setTags(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Menu val={1} />
      <div className="min-h-screen">
        <p className="text-4xl text-center font-bold">TAGS</p>
        <div className="m-auto w-3/4">
          {tags.length > 0 &&
            tags.map((tag, key) => {
              return (
                <div
                  key={key}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    <Link to={"/tag/" + tag.name} state={{ tag: tag.name }}>
                      {tag.name}
                    </Link>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Tags;
