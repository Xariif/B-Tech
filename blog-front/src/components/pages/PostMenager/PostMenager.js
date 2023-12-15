import {
	Autocomplete,
	Box,
	Button,
	Container,
	FilledInput,
	Input,
	MenuItem,
	Paper,
	Select,
	Tab,
	Tabs,
	TextField,
	Typography,
	styled,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import NewPost from "./NewPost/NewPost";
import WaitingPosts from "./WaitingPosts/WaitingPosts";
import ApprovedPosts from "./ApprovedPosts/ApprovedPosts";
import DraftPosts from "./DraftPosts/DraftPosts";

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
						<Tab label="Approved posts" value="1" />
						<Tab label="Draft posts" value="2" />
						<Tab label="Post creator" value="3" />
						<Tab label="Waiting for approval" value="4" />
					</TabList>
				</Box>

				<TabPanel value="1">
					<ApprovedPosts />
				</TabPanel>
				<TabPanel value="2">
					<DraftPosts />
				</TabPanel>
				<TabPanel value="3">
					<NewPost />
				</TabPanel>
				<TabPanel value="4">
					<WaitingPosts />
				</TabPanel>
			</TabContext>
		</>
	);
}
