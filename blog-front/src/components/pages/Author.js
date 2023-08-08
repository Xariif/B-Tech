import React from "react";
import { Avatar } from "primereact/avatar";

function Author({ authorData }) {
	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Avatar
					icon="pi pi-user"
					size="large"
					shape="circle"
					label={authorData.name[0]}
					style={{ marginRight: "1rem" }}
				/>

				<h3 style={{ margin: "0", paddingRight: "1rem" }}>
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
