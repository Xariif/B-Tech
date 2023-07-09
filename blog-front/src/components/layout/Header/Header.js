import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
//dodać linki i ikonki
//searchbar
// czy zalogowany? po prawej z awatarem i button do zalogowania itd
export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <i className="pi pi-desktop" style={{ marginRight: "10px" }} />
          B-TECH
        </Link>
      </div>
      <div className="menu">
        <Link to="/najnowsze">Najnowsze</Link>
        <Link to="/top">Top</Link>
        <Link to="/kontakt">kontakt</Link>
        <Link to="/login">
          <i className="pi pi-power-off" />
        </Link>
      </div>
    </div>
  );
}
