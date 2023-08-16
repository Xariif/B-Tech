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
			style={{
				minWidth: "200px",
				width: "200px",
				display: "flex",
				borderRadius: "1rem",
				overflow: "hidden",
				textAlign: "left",
				fontWeight: "bold",
				backgroundColor: "var(--primary-color)",
				justifyContent: "space-between",
				flexDirection: "column",
				marginRight: "1rem",
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
