import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { Editor } from "primereact/editor";
import { useState } from "react";

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
	return <>Komentarz</>;
}
function CommentList({ comments }) {
	return (
		<>
			{comments.map((comment) => (
				<Comment comment={comment} />
			))}
		</>
	);
}

export default function CommentSection({ postId }) {
	//get comments from api

	return (
		<>
			<NewComment />
		</>
	);
}
