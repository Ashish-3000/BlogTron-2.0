import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";

function Gaming() {
  return (
    <div>
      <Menu val={3} />
      <div className="min-h-screen">
        <div className="text-2xl font-bold text-center">
          New articles will be coming soon
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Gaming;
