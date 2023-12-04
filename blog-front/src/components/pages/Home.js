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

import NotFound from "./NotFound";
export default function Home() {
	const {
		getAccessTokenSilently,
		user,
		isAuthenticated,
		getIdTokenClaims,
		isLoading,
	} = useAuth0();

	const { GetApprovedPosts } = PostService();

	const posts = {
		loading: true,
	};
	// useSelector((state) => state.posts);

	useEffect(() => {
		GetApprovedPosts()
			.then((data) => {
				console.log(data);
				dispatch(getPostsSuccess(data));
			})
			.catch((error) => {});
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
