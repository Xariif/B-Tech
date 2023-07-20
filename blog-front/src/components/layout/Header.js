import React from "react";
import { Link } from "react-router-dom";

//dodać linki i ikonki
//searchbar
// czy zalogowany? po prawej z awatarem i button do zalogowania itd
export default function Header() {
  return (
    <div className="header" style={{ maxHeight: "1100px" }}>
      <div className="logo">
        <Link to="/">
          <i className="pi pi-desktop" />
          B-TECH
        </Link>
      </div>
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/posts">Posts</Link>
      </div>
    </div>
  );
}
