import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PostService from "../../services/PostService";
export default function Newest() {
	const { GetPosts } = PostService();
	const [Posts, setPosts] = useState([]);

	useEffect(() => {
		GetPosts()
			.then((res) => {
				res.data.map((element) => {
					element.image =
						"https://picsum.photos/seed/" + element.id + "/1920/1080";
				});

				//sort by date from newest to oldest
				res.data.sort((a, b) => {
					return new Date(b.date) - new Date(a.date);
				});
				console.log(res.data);
				setPosts(res.data);
			})
			.catch((err) => console.log(err));
	}, []);
	return <>Najnowsze</>;
}
