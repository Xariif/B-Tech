import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PostService from "../../services/PostService";
import PostBigImg from "../ui/PostBigImg";
export default function Newest() {
	const { GetPosts } = PostService();
	const [Posts, setPosts] = useState([]);

	useEffect(() => {
		GetPosts()
			.then((res) => {
				res.map((element) => {
					element.image =
						"https://picsum.photos/seed/" + element.id + "/1920/1080";
				});

				//sort by date from newest to oldest
				res.sort((a, b) => {
					return new Date(b.date) - new Date(a.date);
				});
				console.log(res);
				setPosts(res);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<>
			{Posts.map((element) => (
				<PostBigImg key={element.id} postData={element} />
			))}
		</>
	);
}
