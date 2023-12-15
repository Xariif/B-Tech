import {
	Badge as BaseBadge,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	badgeClasses,
	styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import useService from "../../services/posts/useService";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import { blue, grey } from "@mui/material/colors";
import { Close } from "@mui/icons-material";
import { useNotification } from "../hooks/useNotification";

const PostRow = ({ post }) => {
	const categoryColors = {
		news: "red",
		events: "green",
		reviews: "blue",
		tutorials: "yellow",
		other: "grey",
	};

	return (
		<>
			<Box
				sx={{
					m: 2,
					display: "flex",
					borderRadius: "1rem",
					overflow: "hidden",
					"&:hover": {
						backgroundColor: "grey.700",
						overflow: "hidden",
					},
				}}
			>
				<Box mr={"2rem"} width={"10rem"} height={"10rem"}>
					{post.image ? (
						<img
							src={post.image}
							alt="post image"
							style={{ width: "100%", height: "100%", objectFit: "cover" }}
						/>
					) : (
						<ModeEditIcon
							sx={{ width: "100%", height: "100%", objectFit: "cover" }}
						/>
					)}
				</Box>

				<Box
					sx={{
						m: 1,
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							fontSize: ".8rem",
						}}
					>
						<Box
							sx={{
								width: "3rem",
								height: ".4rem",
								borderRadius: "1rem",
								bgcolor: categoryColors[post.category],
								mr: ".5rem",
							}}
						></Box>{" "}
						{post.category?.toUpperCase()}
					</Box>
					<h1>{post.title}</h1>
					<h3>Category: {post.category}</h3>
					Date of creation: {new Date(
						post.createdAt
					).toLocaleDateString()} at{" "}
					{new Date(post.createdAt).toLocaleTimeString()}
				</Box>
			</Box>
		</>
	);
};

export default PostRow;
