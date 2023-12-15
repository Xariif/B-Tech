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
	const postService = useService();

	const [open, setOpen] = useState(false);
	console.log(post.image);

	return (
		<>
			<Dialog
				open={open}
				onClose={() => {
					setOpen(false);
				}}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				sx={{ borderRadius: "1rem" }}
			>
				<DialogTitle id="alert-dialog-title">
					{"Delete draft post?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this draft post?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						startIcon={<Close />}
						color="success"
						onClick={() => {
							setOpen(false);
						}}
					>
						Cancel
					</Button>
					<Button
						startIcon={<DeleteIcon />}
						color="error"
						onClick={() => {
							setOpen(false);
							console.log(post);
							postService.DeletePost({ id: post.id });
						}}
						autoFocus
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			<Box
				sx={{
					m: 2,
					display: "flex",
					justifyContent: "space-between",
					borderRadius: "1rem",
					overflow: "hidden",
					"&:hover": {
						backgroundColor: "grey.700",
						overflow: "hidden",
					},
				}}
			>
				<Box sx={{ display: "flex" }}>
					{post.image ? (
						<img
							src={post.image}
							alt="post image"
							style={{ width: "10rem", height: "10rem" }}
						/>
					) : (
						<ModeEditIcon style={{ width: "10rem", height: "10rem" }} />
					)}

					<Box
						sx={{
							m: 1,
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<h1>{post.title}</h1>
						<h3>Category: {post.category}</h3>
						<h3>Tags: {post.tags}</h3>
						Date of creation: {new Date(
							post.createdAt
						).toLocaleDateString()} at{" "}
						{new Date(post.createdAt).toLocaleTimeString()}
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						p: 1,
					}}
				>
					<Button
						startIcon={<ModeEditIcon />}
						color="info"
						onClick={() => {
							console.log("edit");
						}}
					>
						Edit
					</Button>
					<Button
						startIcon={<DeleteIcon />}
						color="error"
						onClick={() => {
							setOpen(true);
						}}
					>
						Delete
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default PostRow;
