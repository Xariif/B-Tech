import { Link } from "react-router-dom";
import Tag from "./Tag";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";

export default function PostSmallImg({ post }) {
	console.log(post);
	return (
		<div
			className="PostSmallImg"
			style={{
				minWidth: "200px",
				width: "200px",
				borderRadius: "1rem",
				overflow: "hidden",
				border: "1px solid var(--surface-border)",
			}}
		>
			<Link
				style={{
					textDecoration: "none",
					color: "inherit",
				}}
				to={{
					pathname: "/post/" + post.id,
				}}
			>
				<img
					src={"https://picsum.photos/seed/" + post.id + "/1920/1080"}
					alt="zdjęcie"
					style={{
						objectFit: "cover",
						verticalAlign: "top",
						height: "280px",
						width: "200px",
					}}
				/>
				<div
					style={{
						padding: ".5rem",
						fontSize: ".75rem",
						maxHeight: "2.5rem", // '2rem
						display: "-webkit-box",
						WebkitBoxOrient: "vertical",
						WebkitLineClamp: 2,
						height: "2.5rem",
						overflow: "hidden",
						textOverflow: "ellipsis",
						fontWeight: "bold",
					}}
				>
					{post.title}
				</div>
			</Link>
		</div>
	);
}
