import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Header.css";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { ThemeContext } from "../../../context/ThemeContext";
import { PrimeReactContext } from "primereact/api";
import useLocalStorage from "../../hooks/useLocalStorage";
import { InputText } from "primereact/inputtext";
import Search from "../../pages/Search";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
	const nextTheme = useContext(ThemeContext);

	const navigate = useNavigate();
	const {
		user,
		isAuthenticated,
		isLoading,
		logout,
		loginWithRedirect,
		getAccessTokenSilently,
	} = useAuth0();

	const [searchValue, setSearchValue] = useState("");

	function handleSearch(event) {
		if (searchValue.trim() === "") {
			return;
		}
		event.preventDefault();
		navigate("/search/" + searchValue);
		setSearchValue("");
	}

	return (
		<div id="header" className="header">
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
						<i className="pi pi-search" onClick={handleSearch} />
						<InputText
							placeholder="Search"
							style={{ borderRadius: "1rem" }}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									handleSearch(event);
								}
							}}
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
						/>
					</span>
					<Link to="/newest">Newest</Link>
					<Link to="/top">Top</Link>
					<Link to="/contact">Contact</Link>

					{isAuthenticated || isLoading ? (
						<>
							<i
								className="pi pi-power-off"
								style={{
									cursor: "pointer",
									marginRight: "1rem",
								}}
								onClick={() =>
									logout({ logoutParams: { returnTo: window.location.origin } })
								}
							/>
						</>
					) : (
						<>
							<Button
								style={{
									backgroundColor: "transparent",
									border: "none",
									cursor: "pointer",
									marginRight: "1rem",
									color: "var(--text)",
								}}
								onClick={() => loginWithRedirect()}
							>
								LOG IN
							</Button>
						</>
					)}

					<i
						className="pi pi-moon"
						style={{
							transform: "rotate(-90deg)",
							cursor: "pointer",
							marginRight: "1rem",
						}}
						onClick={() => {
							nextTheme();
						}}
					/>
				</div>
			</div>
		</div>
	);
}
