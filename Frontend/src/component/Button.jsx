import React from "react";
import { Link } from "react-router-dom";

function Button({ color, path, name }) {
  return (
    <>
      <Link
        to={path}
        className={`${color} text-center rounded-lg py-2 w-full font-semibold text-white`}
      >
        {name}
      </Link>
    </>
  );
}

export default Button;
