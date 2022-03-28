import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";

function Reviews() {
  return (
    <div>
      <Menu val={2} />
      <div className="min-h-screen">
        <div className="text-2xl font-bold text-center">
          New articles will be coming soon
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Reviews;
