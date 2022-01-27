import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../assets/profile-picture-3.jpg";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";
import { GiHumanTarget } from "react-icons/gi";
import { isAuthenticated } from "../auth";

function AuthorBox({ user, flag = 0 }) {
  const [dropdown, setDropdown] = useState(false);
  const links = user.links.length == 0 ? (flag = 0) : user.links[0];
  let twitter = "";
  let github = "";
  let mysite = "";
  let linkedin = "";
  if (flag) {
    twitter = links.twitter;
    github = links.github;
    linkedin = links.linkedin;
    mysite = links.mysite;
  }
  return (
    <div>
      <div className="relative w-full px-4 pt-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        {isAuthenticated() && (
          <div className="flex justify-end">
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdown"
              className="sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
            </button>

            {dropdown && (
              <div
                id="dropdown"
                className="absolute mt-8 z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
              >
                <ul className="py-1" aria-labelledby="dropdownButton">
                  <li>
                    <Link
                      to="/profile"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Edit Profile
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col items-center pb-10">
          <img
            className="mb-3 w-24 h-24 rounded-full shadow-lg"
            src={user.photo === "" ? Image : user.photo}
            alt="Bonnie image"
          />
          <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.penname}
          </h3>
          <h3 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
            {user.name}
          </h3>
          {/*<span className="text-sm text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>*/}
          {/*<div className="flex mt-4 space-x-3 lg:mt-6">
            <a
              href="#"
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add friend
            </a>
            <a
              href="#"
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
            >
              Message
          </a>
          </div>*/}
          <div className="mt-3 flex w-3/4 m-auto justify-center">
            {twitter !== "" && (
              <a href={twitter}>
                <BsTwitter size="1x" />
              </a>
            )}
            {github !== "" && (
              <a href={github}>
                <BsGithub />
              </a>
            )}
            {linkedin !== "" && (
              <a href={linkedin}>
                <BsLinkedin style={{ width: "1.8rem", height: "1.8rem" }} />
              </a>
            )}
            {mysite !== "" && (
              <a href={mysite}>
                <GiHumanTarget />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorBox;
