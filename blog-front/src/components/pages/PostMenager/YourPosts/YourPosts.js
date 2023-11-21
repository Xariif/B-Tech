import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import PostService from "../../../../services/PostService";
import { useUser } from "../../../hooks/useUser";
import { useDispatch } from "react-redux";

const YourPosts = () => {
	const [posts, setPosts] = useState([]);

	const postService = PostService();

	const { user } = useUser();

	useEffect(() => {
		user &&
			postService
				.GetPostsByAuthorId(user.sub)
				.then((data) => {
					setPosts(data);
				})
				.catch((error) => {});
	}, [user]);

	return (
		<>
			<Typography variant="h4">Your posts</Typography>
			tu będzie lista postów z możliwościa edycji i usunięcia
		</>
	);
};

export default YourPosts;
