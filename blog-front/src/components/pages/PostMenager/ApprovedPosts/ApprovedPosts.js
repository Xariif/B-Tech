import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { useDispatch } from "react-redux";
import useService from "../../../../services/posts/useService";
import { useNotification } from "../../../hooks/useNotification";
import { useError } from "../../../hooks/useError";
import PostSmallImg from "../../../ui/PostSmallImg";

const ApprovedPosts = () => {
	const [posts, setPosts] = useState([]);
	const { setLoader } = useNotification();
	const { handleError } = useError();
	const postsService = useService();

	const arrayBufferToBase64 = (buffer) => {
		const binary = [];
		const bytes = new Uint8Array(buffer);
		bytes.forEach((byte) => binary.push(String.fromCharCode(byte)));
		return `data:image/jpeg;base64,${window.btoa(binary.join(""))}`;
	};

	useEffect(() => {
		setLoader(true);
		postsService
			.GetAuthorApprovedPosts()
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

	return (
		<>
			{posts.map((post) => {
				return <PostSmallImg key={post.id} post={post} />;
			})}
			<Typography variant="h4">Your posts</Typography>
			tu będzie lista postów z możliwościa edycji i usunięcia
		</>
	);
};

export default ApprovedPosts;
