import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAPI } from "../hooks/useAPI";
import { GetPostById } from "../../services/PostService";
import NotFound from "./NotFound";
import { GetAuthorById } from "../../services/AuthorService";

export default function Post() {
	const { id } = useParams();
	const [Author, setAuthor] = useState(null);
	const [postData, setPostData] = useState(null);

	useEffect(() => {
		GetPostById(id)
			.then((res) => {
				console.log(res.data);
				if (res === null) {
					setPostData(false);
				} else {
					setPostData(res.data);
				}
				return res
			})
			.then((post) => {
				console.log(post);
				GetAuthorById({ id: post.data.authorId }).then((res) => {
					setAuthor(res.data);
				});
			})
			.catch((err) => {
				console.log(err);
				setPostData(false);
			});
	}, [id]);

	console.log(postData);
	if (postData == null) return <div>Loading...</div>;
	else if (postData === false) return <NotFound />;
	else
		return (
			<div style={{ maxWidth: "1180px", margin: "0 auto" }}>
				<h1> {postData.title}</h1>
				<p>
					<Link
						style={{
							display: "flex",
							textDecoration: "none",
							color: "inherit",
						}}
						to={{
							pathname: "/author/" + postData.authorId,
						}}
					>
						<div style={{ fontWeight: "bold" }}>
							{Author && Author?.name + " " + Author?.surname}&nbsp;
						</div>
						{new Date(postData.createdAt).toLocaleDateString("pl-PL", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</Link>
				</p>
				<img
					src={"https://picsum.photos/seed/" + postData.id + "/1920/1080"}
					style={{
						borderRadius: "1.5rem",
						height: "480px",
						width: "100%",
						marginBottom: "1rem",
					}}
				/>
				<p>{postData.content}</p>
			</div>
		);
}
