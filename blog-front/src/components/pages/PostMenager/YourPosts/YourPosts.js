import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { useDispatch } from "react-redux";
import useService from "../../../../services/posts/useService";

const YourPosts = () => {
	const [posts, setPosts] = useState([]);

	const postService = useService();

	return (
		<>
			<Typography variant="h4">Your posts</Typography>
			tu będzie lista postów z możliwościa edycji i usunięcia
		</>
	);
};

export default YourPosts;
