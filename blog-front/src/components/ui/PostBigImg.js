import { Link } from "react-router-dom";
import Tag from "./Tag";
import { useEffect, useState } from "react";

export default function PostBigImg({ post }) {
	return (
		<div
			style={{
				backgroundColor: "var(--surface-card)",
				borderRadius: "var(--border-radius)",
				padding: "1rem",

				marginTop: "1rem",
			}}
		>
			<div
				style={{
					borderBottom: "1px solid grey",
					marginBottom: ".5rem",
					paddingBottom: ".5rem",
					maxWidth: "calc(1180px - 10rem)",
					margin: ".5rem auto ",
				}}
			>
				<Tag tag={post.tag} />
				<Link
					to={"post/" + post.id}
					style={{
						fontWeight: "bolder",
						fontSize: "2rem",
						textDecoration: "none",
						color: "inherit",
					}}
				>
					{post.title}
				</Link>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						fontSize: ".8rem",
					}}
				>
					<Link
						style={{
							display: "flex",
							textDecoration: "none",
							color: "inherit",
						}}
						to={{
							pathname: "/author/" + post.authorId,
						}}
					>
						<div style={{ fontWeight: "bold" }}>
							{post.authorName}&nbsp;{post.authorSurname}&nbsp;
						</div>
						{new Date(post.createdAt).toLocaleDateString("en-EN", {
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
							hour12: false,
							hourCycle: "h24",
						})}
					</Link>
					<p style={{ margin: "0", userSelect: "none" }}>Views: {post.views}</p>
				</div>
			</div>

			<Link
				to={{
					pathname: "post/" + post.id,
					state: { postData: post },
				}}
				style={{
					display: "block",
					borderRadius: "1.5rem",
					overflow: "hidden",
					lineHeight: "0",
				}}
			>
				<img
					src={post.image}
					alt="zdjęcie"
					style={{
						objectFit: "cover",

						height: "480px",
						width: "100%",
					}}
				/>
			</Link>
		</div>
	);
}
