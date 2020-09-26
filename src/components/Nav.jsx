import React, { useState } from "react";
import classnames from "classnames";
import "../static/Nav.css";

const Nav = () => {
  // toggle for the nav hamburger
  const [toggle, setToggle] = useState(false);

  // changes the toggle variables
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="nav_wrapper">
      {/* for mobile hamburger nav */}
      <div className="burger" onClick={handleToggle}>
        <div className="menu">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      <div
        className={classnames({
          ["mobile-nav"]: true,
          ["mobile-nav-hidden"]: !toggle,
        })}
      >
        <ul className="mobile-ul">
          <img
            src={require("../images/transparent_logo.png")}
            alt="HackIllinois Logo"
            className="mobile-nav-logo"
          />
          <li className="mobile-li">Maps</li>
          <li className="mobile-li">Mentors</li>
          <li className="mobile-li">Prizes</li>
          <li className="mobile-li">Schedule</li>
          <li className="mobile-li">Travel</li>
        </ul>
      </div>

      {/* web */}
      <ul className="ul">
        <a href="/">
          <img
            src={require("../images/transparent_logo.png")}
            alt="HackIllinois Logo"
            className="logo"
          />
        </a>
        <li className="li">Maps</li>
        <li className="li">Mentors</li>
        <li className="li">Prizes</li>
        <li className="li">Schedule</li>
        <li className="li">Travel</li>
      </ul>
    </div>
  );
};

export default Nav;
