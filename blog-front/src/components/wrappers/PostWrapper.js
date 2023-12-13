import NotFound from "../pages/NotFound";
import Post from "../pages/Post";

import Loading from "../ui/Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostBigImg from "../ui/PostBigImg";

export default function PostWrapper() {
	const { id } = useParams();

	const [postData, setPostData] = useState(null);

	useEffect(() => {}, [id]);

	if (postData) return <Loading />;
	else if (postData === false) return <NotFound />;
	else return <Post postData={postData} />;
}
