/**
 * Renders Footer component
 */

import React from "react";
import "./style.scss";

const Footer = () => (
  <footer>
    <p>&copy; {new Date().getFullYear()} Even Financial, Inc. - CONFIDENTIAL</p>
  </footer>
);

export default Footer;
