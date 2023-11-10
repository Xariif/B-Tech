import NotFound from "../pages/NotFound";
import Post from "../pages/Post";
import PostService from "../../services/PostService";
import AuthorService from "../../services/AuthorService";
import Loading from "../ui/Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostBigImg from "../ui/PostBigImg";

export default function PostWrapper() {
	const { GetPostById } = PostService();
	const { id } = useParams();

	const [postData, setPostData] = useState(null);

	useEffect(() => {
		GetPostById(id)
			.then((res) => {
				if (res === null) {
					setPostData(false);
				} else {
					setPostData(res);
				}
				return res;
			})

			.catch((err) => {
				console.log(err);
				setPostData(false);
			});
	}, [id]);

	if (postData == null) return <Loading />;
	else if (postData === false) return <NotFound />;
	else return <Post postData={postData} />;
}
