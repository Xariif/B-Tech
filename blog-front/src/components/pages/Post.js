import { Link, useParams } from "react-router-dom";
import Tag from "../ui/Tag";
import CommentSection from "../ui/CommentSection";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useNotification } from "../hooks/useNotification";
import { useError } from "../hooks/useError";
import useService from "../../services/posts/useService";
import { createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";
import PostBigImg from "../ui/PostBigImg";

export default function Post({ postData }) {
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
				<Tag tag={postData.tag} />
				<div
					style={{
						fontWeight: "bolder",
						fontSize: "2rem",
						textDecoration: "none",
						color: "inherit",
					}}
				>
					{postData.title}
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						fontSize: ".8rem",
					}}
				>
					<div
						style={{
							display: "flex",
							textDecoration: "none",
							color: "inherit",
						}}
					>
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
							{postData.authorName}&nbsp;{postData.authorSurname}&nbsp;
						</Link>
						{new Date(postData.createdAt).toLocaleDateString("en-EN", {
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
							hour12: false,
							hourCycle: "h24",
						})}
					</div>
					<p style={{ margin: "0", userSelect: "none" }}>
						Views: {postData.views}
					</p>
				</div>
			</div>
			<img
				src={postData.image}
				alt="zdjęcie"
				style={{
					objectFit: "cover",
					display: "block",
					borderRadius: "1.5rem",
					overflow: "hidden",
					lineHeight: "0",
					height: "480px",
					width: "100%",
				}}
			/>
			<div
				style={{
					marginTop: "1rem",
					fontSize: "1.2rem",
					lineHeight: "1.5rem",
					whiteSpace: "pre-wrap",
				}}
			>
				{postData.content}
			</div>
		</div>
	);
}
