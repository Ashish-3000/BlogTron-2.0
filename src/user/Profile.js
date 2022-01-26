import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Menu from "../core/Menu";
import { updateLinks } from "./helper/userapicalls";

function Profile() {
  const navigate = useNavigate();
  const { user } = isAuthenticated();
  const [option, setOption] = useState(1);
  const [links, setLinks] = useState({
    twitter: "",
    github: "",
    linkedin: "",
    mysite: "",
  });
  const [error, setError] = useState("");

  const { twitter, github, linkedin, mysite } = links;

  const handleChange = (name) => (e) => {
    setLinks({ ...links, [name]: e.target.value });
  };

  const onSubmit = () => {
    updateLinks(links)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          navigate(`/author/${user.penname}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Menu />
      <div className="grid w-11/12 h-96  m-auto lg:grid-cols-4 justify-item-center items-center">
        <div className="col-span-1">
          <div className="w-48 text-gray-900 bg-white  border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <button
              type="button"
              className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium  border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              onClick={() => {
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
              Edit Name
            </button>
            <button
              type="button"
              className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              onClick={() => {
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
              Links
            </button>
          </div>
        </div>
        <div className="lg:col-span-3">
          {option === 1 && (
            <form>
              <div className="text-center">Not sure about this yet</div>
              <div className="mb-6">
                <label
                  for="penname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  New penname
                </label>
                <input
                  type="text"
                  id="penname"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Robert Cailliau"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </form>
          )}
          {option === 2 && (
            <form>
              {error}
              <div className="mb-6">
                <input
                  type="text"
                  id="twitter"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Twitter Link"
                  value={twitter}
                  onChange={handleChange("twitter")}
                  required=""
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="github"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Github Link"
                  value={github}
                  onChange={handleChange("github")}
                  required=""
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="LinkedIn"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Linked In"
                  value={linkedin}
                  onChange={handleChange("linkedin")}
                  required=""
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="myself"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="My Portfolio"
                  value={mysite}
                  onChange={handleChange("mysite")}
                  required=""
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={onSubmit}
              >
                Upload Links
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
