import NotFound from "./NotFound";
import Post from "./Post";
import { GetPostById } from "../../services/PostService";
import { GetAuthorById } from "../../services/AuthorService";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostBigImg from "./PostBigImg";

export default function PostWrapper() {
	const { id } = useParams();
	const [author, setAuthor] = useState(null);
	const [postData, setPostData] = useState(null);

	useEffect(() => {
		GetPostById(id)
			.then((res) => {
				if (res === null) {
					setPostData(false);
				} else {
					setPostData(res.data);
				}
				return res;
			})
			.then((post) => {
				GetAuthorById({ id: post.data.authorId }).then((res) => {
					setAuthor(res.data);
				});
			})
			.catch((err) => {
				console.log(err);
				setPostData(false);
				setAuthor(false);
			});
	}, [id]);

	if (postData == null || author == null) return <Loading />;
	else if (postData === false) return <NotFound />;
	else return <PostBigImg postData={postData} author={author} />;
}
