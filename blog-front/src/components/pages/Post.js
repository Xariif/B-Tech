import { Link } from "react-router-dom";
import Tag from "../ui/Tag";
import CommentSection from "../ui/CommentSection";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";

export default function PostBigImg({ postData }) {
	const opionionsRef = useRef(null);

	return (
		<div>
			<div
				id="post"
				style={{
					backgroundColor: "var(--surface-card)",
					borderRadius: "var(--border-radius)",
					padding: "1rem",
				}}
			>
				<Opinions />
				<div
					style={{
						margin: "0 auto .5rem ",
						maxWidth: "calc(1180px - 10rem)",
						borderBottom: "1px solid grey",
						marginBottom: ".5rem",
						paddingBottom: ".5rem",
					}}
				>
					<Tag tag={postData.tag} />

					<div
						style={{
							fontSize: "2rem",
							fontWeight: "bolder",
							wordWrap: "break-word",
						}}
					>
						{postData.title}
					</div>

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
								{postData.authorName}&nbsp;
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
						objectFit: "cover",

						borderRadius: "1.5rem",
						height: "480px",
						width: "100%",
						marginBottom: "1rem",
					}}
				/>
				<div
					style={{ margin: ".5rem auto ", maxWidth: "calc(1180px - 10rem)" }}
				>
					{postData.content}
				</div>
			</div>
			<CommentSection postId={postData.id} />
		</div>
	);
}

function Opinions() {
	const [showOpinions, setShowOpinions] = useState(false);

	const opionionsRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			const postHeight = document.getElementById("post").offsetHeight;
			const headerHeight = document.getElementById("header").offsetHeight;

			const height = postHeight + headerHeight;

			const scrollPosition = window.scrollY + window.innerHeight;

			//console.log(scrollPosition, height);

			if (scrollPosition >= height / 2 && scrollPosition < height) {
				setShowOpinions(true);
			} else if (scrollPosition >= height) {
				setShowOpinions(false);
			} else if (scrollPosition < height / 2) {
				setShowOpinions(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			ref={opionionsRef}
			style={{
				position: "fixed",
				right: ".5rem",
				bottom: ".5rem",
				display: "flex",
				alignItems: "center",
				opacity: showOpinions ? "1" : "0",
				transition: "opacity 0.5s ease-in-out",
				zIndex: "100",
			}}
		>
			<Button
				severity="success"
				style={{ marginRight: ".5rem" }}
				icon="pi pi-thumbs-up-fill"
				onClick={() => {
					opionionsRef.current.style.visibility = "hidden";
				}}
			></Button>
			<Button
				severity="danger"
				icon="pi pi-thumbs-down-fill"
				onClick={() => {
					opionionsRef.current.style.visibility = "hidden";
				}}
			></Button>
		</div>
	);
}
