import React from "react";

import GoogleBtn from "../google/GoogleBtn";
import Register from "../register/Register";
import Login from "../login/Login";

export default function LogRegisPage() {
  return (
    <div>
      <div className="components-div">
        <Register />
      </div>
      <div className="components-div">
        <Login />
      </div>
      <div className="components-div">
        <GoogleBtn />
      </div>
    </div>
  );
}
