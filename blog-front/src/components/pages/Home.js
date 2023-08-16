import { useEffect, useState } from "react";
import { GetPosts } from "../../services/PostService";
import { GetAuthorById } from "../../services/AuthorService";
import { Link } from "react-router-dom";
import PostBigImg from "./PostBigImg";
import PostSmallImg from "./PostSmallImg";
import Tag from "../ui/Tag";

export default function Home() {
	const [Posts, setPosts] = useState([]);

	useEffect(() => {
		GetPosts()
			.then((res) => {
				res.data.map((element) => {
					element.image =
						"https://picsum.photos/seed/" + element.id + "/1920/1080";
				});
				setPosts(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const importantPosts = Posts.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	)
		.filter((element) => element.tag === "important")
		.slice(0, 5);

	console.log(importantPosts, Posts);

	return (
		<div style={{ maxWidth: "1180px", margin: "0 auto" }}>
			<div style={{ margin: "0px auto", overflowX: "auto" }}>
				<div style={{ margin: "0px 5rem 0.5rem" }}>
					{" "}
					<Tag tag="important" />
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",

						paddingBottom: "1rem",
					}}
				>
					{importantPosts
						.filter((element) => element.tag === "important")
						.map((element) => {
							return <PostSmallImg postData={element} key={element.id} />;
						})}
				</div>
			</div>

			{Posts.filter((post) => post.tag !== "important").map((element) => {
				console.log(element);

				return <PostBigImg postData={element} key={element.id} />;
			})}
		</div>
	);
}
