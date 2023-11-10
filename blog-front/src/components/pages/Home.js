import { useEffect, useState } from "react";
import PostService from "../../services/PostService";
import { GetAuthorById } from "../../services/AuthorService";
import { Link } from "react-router-dom";
import PostBigImg from "../ui/PostBigImg";
import PostSmallImg from "../ui/PostSmallImg";
import Tag from "../ui/Tag";
import Loading from "../ui/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import useAPI from "../hooks/useAPI";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	getPostsFailure,
	getPostsRequest,
	getPostsSuccess,
} from "../../features/posts/postsActions";
import { createToast } from "../../features/toasts/toastsActions";
import NotFound from "./NotFound";
export default function Home() {
	const {
		getAccessTokenSilently,
		user,
		isAuthenticated,
		getIdTokenClaims,
		isLoading,
	} = useAuth0();

	const { GetPosts } = PostService();
	const dispatch = useDispatch();

	const posts = useSelector((state) => state.posts);

	useEffect(() => {
		dispatch(getPostsRequest());
		GetPosts()
			.then((data) => {
				dispatch(getPostsSuccess(data));
			})
			.catch((error) => {
				dispatch(getPostsFailure(error));
				dispatch(
					createToast({
						message: error.message,
						type: "error",
						timeout: 5000,
						severity: "error",
					})
				);
			});
	}, []);

	if (posts.loading) return <Loading />;
	else if (posts.error) {
		return <NotFound />;
	} else
		return (
			<Paper>
				{posts.posts.map((post) => {
					return (
						<div key={post.id}>
							<PostBigImg post={post} />
						</div>
					);
				})}
			</Paper>
		);
}
