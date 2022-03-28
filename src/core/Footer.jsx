import React from "react";

function Footer() {
  return (
    <div className=" bg-black h-44 mt-10 text-center">
      <div
        className="text-white h-full grid lg:grid
         lg:grid-cols-2  md:grid md:grid-cols-2 
       justify-items-center items-center"
      >
        <p className="text-2xl lg:col-span-1 md:col-span-1">BLOGTRON</p>
        <p className="text-2xl lg:col-span-1 md:col-span-1">
          Still thinking about it ...
        </p>
      </div>
    </div>
  );
}

export default Footer;
