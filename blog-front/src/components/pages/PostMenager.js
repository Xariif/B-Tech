import {
	Autocomplete,
	Box,
	Button,
	MenuItem,
	Paper,
	Select,
	Tab,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { createToast } from "../../features/toasts/toastsActions";
import { useDispatch } from "react-redux";
import PostService from "../../services/PostService";
export default function PostMenager() {
	const [value, setValue] = useState("1");
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList onChange={handleChange} aria-label="lab API tabs example">
						<Tab label="Your posts" value="1" />
						<Tab label="Post creator" value="2" />
						<Tab label="Waiting for approval" value="3" />
					</TabList>
				</Box>
				<TabPanel value="1">
					<YourPosts />
				</TabPanel>
				<TabPanel value="2">
					<NewPost />
				</TabPanel>
				<TabPanel value="3">
					<WaitingForApproval />
				</TabPanel>
			</TabContext>
		</>
	);
}

const NewPost = () => {
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
	const { CreatePost } = PostService();

	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [tags, setTags] = useState([]);
	const [content, setContent] = useState("");

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
			content.length > 0
		) {
			setSubmitButtonDisabled(false);
		} else {
			setSubmitButtonDisabled(true);
		}
	};

	useEffect(() => {
		chceckIfSubmitButtonShouldBeDisabled();
	}, [title, category, tags, content]);

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
			<TextField
				id="outlined-select-currency"
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
			<Button
				variant="contained"
				sx={{ mt: 2 }}
				disabled={submitButtonDisabled}
				onClick={() => {
					CreatePost({
						title: title,
						category: category,
						tags: tags,
						content: content,
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
			<Button
				variant="contained"
				color={"error"}
				sx={{ mt: 2, ml: 2 }}
				onClick={() => {
					setTitle("");
					setCategory("");
					setTags([]);
					setContent("");
				}}
			>
				Cancel
			</Button>
		</Paper>
	);
};

const YourPosts = () => {
	return (
		<>
			<Typography variant="h4">Your posts</Typography>
			tu będzie lista postów z możliwościa edycji i usunięcia
		</>
	);
};

const WaitingForApproval = () => {
	return (
		<>
			<Typography variant="h4">Waiting for approval</Typography>
			tu będzie lista postów oczeikujących na zatwierdzenie lub orzuconych z
			informacją
		</>
	);
};
