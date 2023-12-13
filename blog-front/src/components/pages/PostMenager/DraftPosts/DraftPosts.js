import { useEffect, useState } from "react";
import useService from "../../../../services/posts/useService";
import { useNotification } from "../../../hooks/useNotification";
import PostSmallImg from "../../../ui/PostSmallImg";
import PostRow from "../../../ui/PostRow";
import { Paper } from "@mui/material";

const DraftPosts = () => {
	const postsService = useService();
	const notification = useNotification();

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		notification.setLoader(true);
		postsService
			.GetDraftPosts()
			.then((response) => {
				console.log(response);
				setPosts(response);
			})
			.finally(() => {
				notification.setLoader(false);
			});
	}, []);

	console.log(posts);
	if (posts.length === 0) {
		return null;
	}

	return (
		<>
			{posts.map((post) => {
				return <PostRow key={post.id} post={post} />;
			})}
		</>
	);
};

export default DraftPosts;
