import { useEffect, useState } from "react";
import { GetPosts } from "../../services/PostService";
import { GetAuthorById } from "../../services/AuthorService";
import { Link } from "react-router-dom";

const TagColors = {
	TECH: "blue",
	SPACE: "orange",
	MOTO: "red",
	NATURE: "green",
};

function HomePost({ PostData }) {
	const [Author, setAuthor] = useState(null);
	console.log(PostData);
	useEffect(() => {
		GetAuthorById({ id: PostData.authorId }).then((res) => {
			setAuthor(res.data);
			console.log(res.data);
		});
	}, []);

	return (
		<>
			<div style={{ maxWidth: "1180px", margin: "0 auto" }}>
				<div
					style={{
						margin: "0 5rem",
						borderBottom: "1px solid grey",
						marginBottom: ".5rem",
						paddingBottom: ".5rem",
					}}
				>
					<div
						style={{ display: "flex", alignItems: "center", fontSize: ".5rem" }}
					>
						<div
							style={{
								backgroundColor: TagColors[PostData.tag.toUpperCase()],
								height: ".3rem",
								width: "1.5rem ",
								marginRight: ".5rem",
							}}
						></div>

						<div style={{ marginRight: "1rem", textTransform: "uppercase" }}>
							{PostData.tag}
						</div>
					</div>
					<a
						href={"post/" + PostData.id}
						style={{
							fontWeight: "bolder",
							fontSize: "2rem",
							textDecoration: "none",
							color: "inherit",
						}}
					>
						{PostData.title}
					</a>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							fontSize: ".8rem",
						}}
					>
						<Link
							style={{
								display: "flex",
								textDecoration: "none",
								color: "inherit",
							}}
							to={{
								pathname: "/author/" + PostData.authorId,
							}}
						>
							<div style={{ fontWeight: "bold" }}>
								{Author && Author?.name + " " + Author?.surname}&nbsp;
							</div>
							{new Date(PostData.createdAt).toLocaleDateString("pl-PL", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</Link>
						<p style={{ margin: "0", userSelect: "none" }}>
							Views: {Math.floor(Math.random() * 1000) + 1}
							&nbsp; Comments: {Math.floor(Math.random() * 100) + 1}
						</p>
					</div>
				</div>

				<Link
					to={{
						pathname: "/post/" + PostData.id,
					}}
				>
					<img
						src={PostData.image}
						alt="zdjęcie"
						style={{
							borderRadius: "1.5rem",
							height: "480px",
							width: "100%",
							marginBottom: "1rem",
						}}
					/>
				</Link>
			</div>
		</>
	);
}

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
	return (
		<>
			{Posts.map((element) => {
				return <HomePost PostData={element} key={element.id} />;
			})}
		</>
	);
}
