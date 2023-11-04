import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.css";
export function Layout(props) {
	return (
		<div className="layout">
			<Header />
			<main style={{ width: "1180px", margin: "0 auto" }}>{props.content}</main>
			<Footer />
		</div>
	);
}
