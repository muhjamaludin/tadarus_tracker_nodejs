import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to={"/"}>
            Home
          </Link>
          <Link className="navbar-item" to={"/stats"}>
            Stats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
