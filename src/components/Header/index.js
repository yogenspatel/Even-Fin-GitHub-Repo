/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./style.scss";
import logoImage from "../../assets/test.jpg";

const Header = () => (
  <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
    <a href="#" className="container">
      <img src={logoImage} />
    </a>
  </header>
);

export default Header;
