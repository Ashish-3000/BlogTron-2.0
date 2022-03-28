import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Menu from "../core/Menu";
import Upload from "../core/Upload";
import { updateLinks, updatePic } from "./helper/userapicalls";

function Profile() {
  const navigate = useNavigate();
  const { user } = isAuthenticated();
  const [option, setOption] = useState(3);
  const [links, setLinks] = useState({
    twitter: "",
    github: "",
    linkedin: "",
    mysite: "",
  });
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  const [error, setError] = useState("");

  const { twitter, github, linkedin, mysite } = links;

  const handleChange = (name) => (e) => {
    setLinks({ ...links, [name]: e.target.value });
  };

  const changePic = () => {
    updatePic(url).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        navigate(`/author/${user.penname}`);
      }
    });
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

  const types = ["image/png", "image/jpeg", "image/jfif", "image/jpg"];
  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png,jpeg or jpg)");
    }
  };

  return (
    <div>
      <Menu />
      <div className="grid w-11/12 h-96 m-auto mt-10 lg:grid-cols-4 justify-items-center items-center">
        <div className="col-span-1 lg:col-span-1 pb-3">
          <div className="w-48 text-gray-900 bg-white  border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <button
              type="button"
              className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium  border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              onClick={() => {
                setOption(1);
              }}
              style={option === 1 ? styles.boundary : {}}
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
              style={option === 2 ? styles.boundary : {}}
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
            <button
              type="button"
              className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium  border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              onClick={() => {
                setOption(3);
              }}
              style={option === 3 ? styles.boundary : {}}
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
              Update Pic
            </button>
          </div>
        </div>
        <div className="lg:col-span-3 w-3/4">
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
          {option === 3 && (
            <div className="w-full">
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={changeHandler}
              />
              {url === "" && (
                <label
                  type="button"
                  className="m-auto w-1/2 text-gray-900
                   bg-white border border-gray-300
                    hover:bg-gray-100 focus:ring-4
                     focus:ring-blue-300 font-medium
                      rounded-lg text-sm px-5 py-2.5
                       text-center"
                  for="file"
                >
                  Add Image
                </label>
              )}
              {error && <div>{error}</div>}
              {file && <Upload setUrl={setUrl} file={file} />}
              {url !== "" && (
                <div>
                  <div
                    className="m-3 mb-6 flex flex-col sm:flex-row  
                  flex-items-center items-center"
                  >
                    <img
                      src={url}
                      className="w-48 h-48 sm:w-80 sm:h-80 rounded-full"
                    />
                    <div
                      type="button"
                      className="ml-3 mt-1 text-gray-900
                     bg-white border border-gray-300
                      hover:bg-gray-100 focus:ring-4 
                      focus:ring-blue-300 font-medium
                       rounded-lg text-sm px-5 py-2.5 
                       text-center mr-2 mb-2 
                       dark:bg-gray-600 dark:text-white
                       dark:border-gray-600 dark:hover:bg-gray-700 
                       dark:hover:border-gray-700 dark:focus:ring-gray-800"
                      onClick={() => {
                        setUrl("");
                        setFile("");
                      }}
                    >
                      Remove
                    </div>
                    <button
                      type="submit"
                      className="text-white 
                     bg-blue-700 hover:bg-blue-800
                      focus:ring-4 focus:ring-blue-300
                       font-medium rounded-lg 
                       text-sm px-5 py-2.5 text-center
                        dark:bg-blue-600
                         dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={changePic}
                    >
                      All set
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

const styles = {
  boundary: { color: "blue", border: "2px solid blue" },
};
