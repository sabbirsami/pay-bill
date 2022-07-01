import React from "react";
import notFound from "../img/notFound.png";

const PageNotFound = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <img className="w-100" src={notFound} alt="" />
      </div>
    </div>
  );
};

export default PageNotFound;
