import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Post({ postData, author }) {
	return (
		<div style={{ maxWidth: "1180px", margin: "0 auto" }}>
			<h1> {postData.title}</h1>

			<Link
				style={{
					display: "flex",
					textDecoration: "none",
					color: "inherit",
				}}
				to={{
					pathname: "/author/" + postData.authorId,
				}}
			>
				<div style={{ fontWeight: "bold" }}>
					{author.name + " " + author.surname}&nbsp;
				</div>
				{new Date(postData.createdAt).toLocaleDateString("pl-PL", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</Link>

			<img
				src={"https://picsum.photos/seed/" + postData.id + "/1920/1080"}
				style={{
					borderRadius: "1.5rem",
					height: "480px",
					width: "100%",
					marginBottom: "1rem",
				}}
			/>
			<p>{postData.content}</p>
		</div>
	);
}
