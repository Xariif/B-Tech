import { useEffect, useState } from "react";
import PostService from "../../../../services/PostService";
import { useDispatch } from "react-redux";
import {
	Box,
	Paper,
	TextField,
	Typography,
	styled,
	Button,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { createToast } from "../../../../features/toasts/toastsActions";

const NewPost = () => {
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
	const { CreatePost } = PostService();

	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [tags, setTags] = useState([]);
	const [content, setContent] = useState("");
	const [file, setFile] = useState(null);

	const dispatch = useDispatch();

	const categories = [
		{
			value: 1,
			label: "Cars",
			name: "cars",
		},
		{
			value: 2,
			label: "Tech",
		},
		{
			value: 3,
			label: "Business",
		},
		{
			value: 4,
			label: "Finance",
		},
		{
			value: 5,
			label: "Health",
		},
		{
			value: 6,
			label: "Fitness",
		},
		{
			value: 7,
			label: "Lifestyle",
		},
		{
			value: 8,
			label: "Travel",
		},
		{
			value: 9,
			label: "Food",
		},
		{
			value: 10,
			label: "Fashion",
		},
		{
			value: 11,
			label: "Entertainment",
		},
		{
			value: 12,
			label: "Education",
		},
	];

	const tagsTypes = [
		"CARS",
		"TECH",
		"BUSINESS",
		"NEWS",
		"REVIEWS",
		"TUTORIALS",
		"TIPS",
		"HOW-TO",
		"DIY",
		"PERSONAL STORIES",
		"OPINION",
		"HUMOR",
	];

	const chceckIfSubmitButtonShouldBeDisabled = () => {
		if (
			title.length > 0 &&
			category != "" &&
			tags.length > 0 &&
			content.length > 0 &&
			file != null
		) {
			setSubmitButtonDisabled(false);
		} else {
			setSubmitButtonDisabled(true);
		}
	};

	useEffect(() => {
		chceckIfSubmitButtonShouldBeDisabled();
	}, [title, category, tags, content, file]);

	const VisuallyHiddenInput = styled("input")({
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		height: 1,
		overflow: "hidden",
		position: "absolute",
		bottom: 0,
		left: 0,
		whiteSpace: "nowrap",
		width: 1,
	});
	return (
		<Paper sx={{ p: 2 }}>
			<Typography variant="h4">New Post</Typography>
			<TextField
				type="text"
				label="Title"
				fullWidth
				sx={{ mt: 2 }}
				value={title}
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			/>

			<Box sx={{ mt: 2, display: "flex" }}>
				<Button
					component="label"
					variant="contained"
					startIcon={<CloudUploadIcon />}
					sx={{ mr: 2, width: "-webkit-fill-available" }}
				>
					Upload image
					<VisuallyHiddenInput
						type="file"
						accept="image/*"
						multiple={false}
						onChange={(e) => {
							console.log(e.target.files);
							setFile(e.target.files[0]);
						}}
					/>
				</Button>
				<TextField
					value={file?.name}
					disabled
					sx={{ width: "-webkit-fill-available" }}
				/>
			</Box>
			<TextField
				select
				label="Category"
				defaultValue={category}
				fullWidth
				sx={{ mt: 2 }}
				value={category}
				onChange={(e) => {
					setCategory(e.target.value);
				}}
			>
				{categories.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</TextField>
			<Autocomplete
				multiple
				id="multiple-limit-tags"
				options={tagsTypes}
				getOptionLabel={(option) => option}
				renderInput={(params) => <TextField {...params} label="Tags" />}
				sx={{ mt: 2 }}
				value={tags}
				onChange={(e, value) => {
					setTags(value);
				}}
			/>

			<TextField
				id="outlined-multiline-static"
				label="Content"
				multiline
				minRows={20}
				fullWidth
				sx={{ mt: 2 }}
				value={content}
				onChange={(e) => {
					if (e.target.value.length > 10000) return;

					setContent((prev) => e.target.value);
				}}
			/>
			<Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
				<Button
					variant="contained"
					color={"error"}
					onClick={() => {
						setTitle("");
						setCategory("");
						setTags([]);
						setContent("");
						setFile(null);
					}}
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					disabled={submitButtonDisabled}
					onClick={() => {
						CreatePost({
							title: title,
							category: category,
							tags: tags,
							content: content,
							image: file,
						}).then((res) => {
							console.log(res);
						});

						dispatch(
							createToast({
								message: "Post created",
								type: "success",
							})
						);
					}}
				>
					Submit
				</Button>
			</Box>
		</Paper>
	);
};

export default NewPost;
