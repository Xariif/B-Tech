import { Link } from "react-router-dom";
import Tag from "./Tag";
import { useEffect, useState } from "react";
import { GetAuthorById } from "../../services/AuthorService";

export default function PostBigImg({ postData }) {
	const [author, setAuthor] = useState(null);
	useEffect(() => {
		GetAuthorById({ id: postData.authorId }).then((res) => {
			setAuthor(res.data);
		});
	}, []);

	if (author == null) return <></>;
	else
		return (
			<div
				style={{
					backgroundColor: "var(--surface-card)",
					borderRadius: "var(--border-radius)",
					padding: "1rem",

					marginTop: "1rem",
				}}
			>
				<div
					style={{
						borderBottom: "1px solid grey",
						marginBottom: ".5rem",
						paddingBottom: ".5rem",
						maxWidth: "calc(1180px - 10rem)",
						margin: ".5rem auto ",
					}}
				>
					<Tag tag={postData.tag} />
					<a
						href={"post/" + postData.id}
						style={{
							fontWeight: "bolder",
							fontSize: "2rem",
							textDecoration: "none",
							color: "inherit",
						}}
					>
						{postData.title}
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
								pathname: "/author/" + postData.authorId,
							}}
						>
							<div style={{ fontWeight: "bold" }}>
								{author.name + " " + author.surname}&nbsp;
							</div>
							{new Date(postData.createdAt).toLocaleDateString("en-EN", {
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
						pathname: "post/" + postData.id,
					}}
				>
					<img
						src={"https://picsum.photos/seed/" + postData.id + "/1920/1080"}
						alt="zdjęcie"
						style={{
							objectFit: "cover",

							borderRadius: "1.5rem",
							height: "480px",
							width: "100%",
						}}
					/>
				</Link>
			</div>
		);
}
