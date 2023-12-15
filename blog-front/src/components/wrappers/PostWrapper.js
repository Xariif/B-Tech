import NotFound from "../pages/NotFound";
import Post from "../pages/Post";

import Loading from "../ui/Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostBigImg from "../ui/PostBigImg";
import { useNotification } from "../hooks/useNotification";
import useService from "../../services/posts/useService";
import { useError } from "../hooks/useError";

export default function PostWrapper() {
	const { id } = useParams();

	const [post, setPost] = useState();

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
			.GetApprovedPostById({ id })
			.then((response) => {
				const fetchImagePromises = [response].map((post) => {
					return postsService
						.GetImage({ id: post.mainPhotoId })
						.then((image) => {
							post.image = arrayBufferToBase64(image);
						})
						.catch((e) => {
							console.log(e);
							post.image = null;
							handleError(e);
						});
				});

				Promise.all(fetchImagePromises)
					.then(() => {
						setPost(response);
					})
					.catch((error) => {
						handleError(error);
					});
			})
			.catch((error) => {
				setPost(false);
			})
			.finally(() => {
				setLoader(false);
			});
	}, [id]);

	if (post === undefined) return null;
	else if (post === false) return <NotFound />;
	else return <Post postData={post} />;
}
