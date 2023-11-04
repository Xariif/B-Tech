import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { Editor } from "primereact/editor";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function NewComment() {
	const [text, setText] = useState("");

	const handlePost = () => {
		console.log(text);
	};

	return (
		<div>
			<h1>Post a Comment</h1>
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
				}}
			>
				<Editor
					value={text}
					onTextChange={(e) => setText(e.htmlValue)}
					style={{ height: "320px" }}
				/>

				<div style={{ display: "flex", gap: "1rem" }}>
					<span className="p-input-icon-left">
						<i className="pi pi-user" />
						<InputText placeholder="Name" style={{ width: "100%" }} />
					</span>
					<span className="p-input-icon-left">
						<i className="pi pi-envelope" />
						<InputText placeholder="E-mail" style={{ width: "100%" }} />
					</span>
					<Button label="Post" onClick={handlePost} />
				</div>
			</div>
		</div>
	);
}

function Comment({ comment }) {
	return <p>Komentarz</p>;
}
function CommentList({ comments }) {
	return (
		<>
			{comments.map((comment) => (
				<Comment comment={comment} key={comment} />
			))}
		</>
	);
}

export default function CommentSection({ postId }) {
	const { isAuthenticated, isLoading } = useAuth0();
	//get comments from api

	return (
		<>
			{isAuthenticated && !isLoading ? (
				<NewComment />
			) : (
				<p>Log in to post a comment</p>
			)}

			<CommentList comments={[1, 2, 3, 4]} />
		</>
	);
}
