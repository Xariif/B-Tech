import { Avatar } from "@mui/material";
import React from "react";

function Author({ authorData }) {
	console.log("🚀 ~ file: Author.js:5 ~ Author ~ authorData:", authorData);
	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<h3 style={{ margin: "0", paddingRight: "1rem" }}>
					{authorData.name + " " + authorData.surname}
				</h3>
				<p>
					Active from{" "}
					{new Date(authorData.activeFrom).toLocaleDateString("en-us", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</p>
			</div>
			<p>{authorData.description}</p>
		</>
	);
}

export default Author;
