import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostBigImg from "../ui/PostBigImg";
import PostSmallImg from "../ui/PostSmallImg";
import Tag from "../ui/Tag";
import Loading from "../ui/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import useAPI from "../hooks/useAPI";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useService from "../../services/posts/useService";

import NotFound from "./NotFound";
import { useNotification } from "../hooks/useNotification";
import { useError } from "../hooks/useError";
export default function Home({ posts }) {
	const {
		getAccessTokenSilently,
		user,
		isAuthenticated,
		getIdTokenClaims,
		isLoading,
	} = useAuth0();

	return (
		<Paper>
			{posts.map((post) => {
				return (
					<div key={post.id}>
						<PostBigImg post={post} />
					</div>
				);
			})}
		</Paper>
	);
}
