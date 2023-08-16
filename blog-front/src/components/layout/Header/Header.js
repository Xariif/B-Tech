import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { ThemeContext } from "../../../context/ThemeContext";
import { PrimeReactContext } from "primereact/api";
import useLocalStorage from "../../hooks/useLocalStorage";
import { InputText } from "primereact/inputtext";

export default function Header() {
	const toggleDarkMode = useContext(ThemeContext);
	const searchRef = useRef(null);

	const [searchValue, setSearchValue] = useState("");

	function handleKeyDown(event) {
		if (event.key === "Enter") {
			console.log("do validate");
			console.log(searchValue);
			//prevent default
			event.preventDefault();
			setSearchValue("");
		}
	}

	return (
		<div className="header">
			<div
				style={{
					width: "calc( 1180px - 2rem )",
					margin: "0 auto",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div className="logo">
					<Link to="/" onClick={() => (document.title = "B-TECH")}>
						<i
							className="pi pi-bolt"
							style={{ marginRight: ".5rem", fontSize: "1.5rem" }}
						/>
						B-TECH
					</Link>
				</div>
				<div className="menu">
					<span className="p-input-icon-right" id="search">
						<i className="pi pi-search" />
						<InputText
							placeholder="Search"
							style={{ borderRadius: "1rem" }}
							onKeyDown={handleKeyDown}
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
						/>
					</span>

					<Link to="/newest">Newest</Link>
					<Link to="/top">Top</Link>
					<Link to="/contact">Contact</Link>
					<i
						className="pi pi-moon"
						style={{
							transform: "rotate(-90deg)",
							cursor: "pointer",
							marginRight: "1rem",
						}}
						onClick={() => {
							toggleDarkMode();
						}}
					/>
				</div>
			</div>
		</div>
	);
}
