import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Author({ authorData }) {
	console.log(authorData);

	return (
		<>
			<div style={{ display: "flex", alignItems: "center", justifyContent:'center' }}>
				<i
					style={{ fontSize: "2rem", paddingRight: "1rem" }}
					className="pi pi-user"
				></i>
				<h3 style={{ margin: "0", paddingRight:'1rem' }}>
					{authorData.name + " " + authorData.surname}
				</h3>
				<p>
					Aktywny od{" "}
					{new Date(authorData.activeFrom).toLocaleDateString("pl-PL", {
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
