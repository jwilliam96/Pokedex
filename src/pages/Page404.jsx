import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <h2>
      ✖️ This page not fount, pls return <Link to="/">home page</Link>
    </h2>
  );
};

export default Page404;
