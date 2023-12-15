import { useEffect, useState } from "react";
import useService from "../../../../services/posts/useService";
import { useNotification } from "../../../hooks/useNotification";
import PostSmallImg from "../../../ui/PostSmallImg";
import PostRow from "../../../ui/PostRow";
import { Paper } from "@mui/material";
import { useError } from "../../../hooks/useError";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const DraftPosts = () => {
	const postsService = useService();
	const { setLoader } = useNotification();
	const { handleError } = useError();

	const [posts, setPosts] = useState([]);

	const arrayBufferToBase64 = (buffer) => {
		const binary = [];
		const bytes = new Uint8Array(buffer);
		bytes.forEach((byte) => binary.push(String.fromCharCode(byte)));
		return `data:image/jpeg;base64,${window.btoa(binary.join(""))}`;
	};

	useEffect(() => {
		setLoader(true);
		postsService
			.GetDraftPosts()
			.then((response) => {
				const fetchImagePromises = response.map((post) => {
					return postsService
						.GetImage({ id: post.mainPhotoId })
						.then((image) => {
							console.log(image);
							post.image = arrayBufferToBase64(image);
						})
						.catch((e) => {
							post.image = null;
							handleError(e);
						});
				});

				Promise.all(fetchImagePromises)
					.then(() => {
						setPosts(response);
					})
					.catch((error) => {
						handleError(error);
					})
					.finally(() => {
						setLoader(false);
					});
			})
			.catch((error) => {
				handleError(error);
				setLoader(false);
			});
	}, []);

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
