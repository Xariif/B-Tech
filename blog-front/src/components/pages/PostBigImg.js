import { Link } from "react-router-dom";
import Tag from "../ui/Tag";

export default function PostBigImg({ postData, author }) {
	console.log(postData);
	return (
		<div style={{ maxWidth: "1180px", margin: "0 auto" }}>
			<div
				style={{
					margin: "0 5rem",
					borderBottom: "1px solid grey",
					marginBottom: ".5rem",
					paddingBottom: ".5rem",
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
						{new Date(postData.createdAt).toLocaleDateString("pl-PL", {
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

			<img
				src={"https://picsum.photos/seed/" + postData.id + "/1920/1080"}
				alt="zdjęcie"
				style={{
					borderRadius: "1.5rem",
					height: "480px",
					width: "100%",
					marginBottom: "1rem",
				}}
			/>
		</div>
	);
}
