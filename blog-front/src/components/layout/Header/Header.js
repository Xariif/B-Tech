import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { Button } from "primereact/button";
import PrimeReact from "primereact/api";
import { ThemeContext } from "../../../context/ThemeContext";
import { InputSwitch } from "primereact/inputswitch";

export default function Header() {
	const toggleDarkMode = useContext(ThemeContext);

	return (
		<div className="header">
			<div
				style={{
					width: "1180px",
					padding: "0 1rem",
					margin: "0 auto",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div className="logo">
					<Link to="/" onClick={() => (document.title = "B-TECH")}>
						<i
							className="pi pi-home"
							style={{ marginRight: "10px", fontSize: "1.5rem" }}
						/>
						B-TECH
					</Link>
				</div>
				<div className="menu">
					<Link to="/newest">Newest</Link>
					<Link to="/top">Top</Link>
					<Link to="/contact">Contact</Link>

					<i
						className="pi pi-moon"
						style={{
							transform: "rotate(-90deg)",
							cursor: "pointer",
						}}
						onClick={
							toggleDarkMode
								? toggleDarkMode
								: () => {
										console.log("toggleDarkMode is undefined");
								  }
						}
					/>
				</div>
			</div>
		</div>
	);
}
