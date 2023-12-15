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

export default function Post(props) {
	const { id } = useParams();

	const [post, setPost] = useState();

	const { setLoader } = useNotification();
	const postsService = useService();
	const { handleError } = useError();

	const arrayBufferToBase64 = (buffer) => {
		const binary = [];
		const bytes = new Uint8Array(buffer);
		bytes.forEach((byte) => binary.push(String.fromCharCode(byte)));
		return `data:image/jpeg;base64,${window.btoa(binary.join(""))}`;
	};

	useEffect(() => {
		setLoader(true);
		postsService
			.GetApprovedPostById({ id })
			.then((response) => {
				const fetchImagePromises = [response].map((post) => {
					return postsService
						.GetImage({ id: post.mainPhotoId })
						.then((image) => {
							post.image = arrayBufferToBase64(image);
						})
						.catch((e) => {
							console.log(e);
							post.image = null;
							handleError(e);
						});
				});

				Promise.all(fetchImagePromises)
					.then(() => {
						setPost(response);
					})
					.catch((error) => {
						handleError(error);
					});
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoader(false);
			});
	}, []);

	if (post === undefined) {
		return null;
	}

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
				<div
					style={{
						fontWeight: "bolder",
						fontSize: "2rem",
						textDecoration: "none",
						color: "inherit",
					}}
				>
					{post.title}
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
								pathname: "/author/" + post.authorId,
							}}
						>
							{post.authorName}&nbsp;{post.authorSurname}&nbsp;
						</Link>
						{new Date(post.createdAt).toLocaleDateString("en-EN", {
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
							hour12: false,
							hourCycle: "h24",
						})}
					</div>
					<p style={{ margin: "0", userSelect: "none" }}>Views: {post.views}</p>
				</div>
			</div>
			<img
				src={post.image}
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
				{post.content}
			</div>
		</div>
	);
}
