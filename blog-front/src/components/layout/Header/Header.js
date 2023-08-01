import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
//dodać linki i ikonki
//searchbar
// czy zalogowany? po prawej z awatarem i button do zalogowania itd
export default function Header() {
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
					<Link to="/najnowsze" onClick={() => (document.title = "Najnowsze")}>
						Najnowsze
					</Link>
					<Link to="/top" onClick={() => (document.title = "Top")}>
						Top
					</Link>
					<Link to="/kontakt" onClick={() => (document.title = "Kontakt")}>
						kontakt
					</Link>
				</div>
			</div>
		</div>
	);
}
