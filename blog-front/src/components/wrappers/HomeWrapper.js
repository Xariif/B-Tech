import NotFound from "../pages/NotFound";
import Post from "../pages/Post";

import Loading from "../ui/Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostBigImg from "../ui/PostBigImg";
import { useNotification } from "../hooks/useNotification";
import useService from "../../services/posts/useService";
import { useError } from "../hooks/useError";
import Home from "../pages/Home";

export default function HomeWrapper() {
	const [posts, setPosts] = useState();

	const { setLoader } = useNotification();
	const postsService = useService();
	const { handleError } = useError();

	const arrayBufferToBase64 = (buffer) => {
		const binary = [];
		const bytes = new Uint8Array(buffer);
		bytes.forEach((byte) => binary.push(String.fromCharCode(byte)));
		return `data:image/jpeg;base64,${window.btoa(binary.join(""))}`;
	};

	useEffect(() => {
		setLoader(true);
		postsService
			.GetApprovedPosts()
			.then((response) => {
				const fetchImagePromises = response.map((post) => {
					return postsService
						.GetImage({ id: post.mainPhotoId })
						.then((image) => {
							post.image = arrayBufferToBase64(image);
						})
						.catch((e) => {
							post.image = null;
							handleError(e);
						});
				});

				Promise.all(fetchImagePromises).then(() => {
					setPosts(response);
				});
			})
			.catch((error) => {
				setPosts(false);
			})
			.finally(() => {
				setLoader(false);
			});
	}, []);

	if (posts === undefined) return null;
	else if (posts === false) return <NotFound />;
	else return <Home posts={posts} />;
}
