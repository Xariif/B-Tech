import { Link } from "react-router-dom";
import Tag from "../ui/Tag";
import { useEffect, useState } from "react";
import { Avatar } from "primereact/avatar";
import { GetAuthorById } from "../../services/AuthorService";

export default function PostSmallImg({ postData }) {
	const [author, setAuthor] = useState(null);
	useEffect(() => {
		GetAuthorById({ id: postData.authorId }).then((res) => {
			setAuthor(res.data);
		});
	}, []);

	if (author == null) return <></>;

	return (
		<div
			className="PostSmallImg"
			style={{
				minWidth: "200px",
				width: "200px",
				borderRadius: "1rem",
				overflow: "hidden",
				fontWeight: "bold",
				border: "1px solid var(--primary-color)",
			}}
		>
			<Link
				style={{
					textDecoration: "none",
					color: "inherit",
				}}
				to={{
					pathname: "/post/" + postData.id,
				}}
			>
				<img
					src={"https://picsum.photos/seed/" + postData.id + "/1920/1080"}
					alt="zdjęcie"
					style={{
						objectFit: "cover",
						verticalAlign: "top",
						height: "280px",
						width: "200px",
					}}
				/>
				<div
					style={{
						padding: ".5rem",
						fontSize: ".75rem",
						maxHeight: "2.5rem", // '2rem
						display: "-webkit-box",
						WebkitBoxOrient: "vertical",
						WebkitLineClamp: 2,
						height: "2.5rem",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{postData.title}
				</div>
			</Link>
			<Link
				style={{
					padding: ".5rem",
					fontSize: ".75rem",
					display: "flex",
					textDecoration: "none",
					color: "inherit",
				}}
				to={{
					pathname: "/author/" + postData.authorId,
				}}
			>
				<Avatar icon="pi pi-user" size="small" shape="circle" />
				<div
					style={{
						display: "flex",
						flexDirection: "column	",
						marginLeft: ".5rem",
					}}
				>
					<div>{author.name + " " + author.surname}</div>
					{new Date(postData.createdAt).toLocaleDateString("pl-PL", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
			</Link>
		</div>
	);
}
