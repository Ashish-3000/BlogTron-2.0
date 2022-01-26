import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";

function About() {
  const link = "mailto:" + process.env.REACT_APP_MAIL;
  return (
    <div>
      <Menu val={4} />
      <div className="min-h-screen text-center">
        <div className="text-4xl font-bold ">
          Let's Explore the tech together
        </div>
        <div className="text-lg  lg:w-5/12 sm:w-7/12 m-auto mt-3">
          This is a blogging website focused on articles related to latest
          technology. The UI is not great currently. I will work on the UI part
          and will try to make it better.
        </div>
        <div className="mt-5 cursor-pointer">
          <a href={link}>Write Mail</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
