import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Pagination, Paper, TextField } from "@mui/material";

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
        <div style={{ display: "flex", gap: "1rem" }}>
          <span className="p-input-icon-left">
            <i className="pi pi-user" />
            <TextField placeholder="Name" style={{ width: "100%" }} />
          </span>
          <span className="p-input-icon-left">
            <i className="pi pi-envelope" />
            <TextField placeholder="E-mail" style={{ width: "100%" }} />
          </span>
          <Button label="Post" onClick={handlePost} />
          <Button icon="pi pi-check" aria-label="Filter" />
          <Button
            icon="pi pi-bookmark"
            severity="secondary"
            aria-label="Bookmark"
          />
          <Button icon="pi pi-search" severity="success" aria-label="Search" />
          <Button icon="pi pi-user" severity="info" aria-label="User" />
          <Button
            icon="pi pi-bell"
            severity="warning"
            aria-label="Notification"
          />
          <Button icon="pi pi-heart" severity="help" aria-label="Favorite" />
          <Button icon="pi pi-times" severity="danger" aria-label="Cancel" />
        </div>
      </div>
    </div>
  );
}

function Comment({ comment }) {
  return (
    <Box title="Imie nazwisko" style={{ margin: ".5rem 0" }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Box>
  );
}
function CommentList({ comments }) {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(1);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  useEffect(() => {
    console.log("comments", comments);
  }, [comments]);

  return (
    <>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment} />
      ))}

      <Pagination count={10} />
    </>
  );
}

export default function CommentSection({ postId }) {
  const { isAuthenticated, isLoading } = useAuth0();
  // get comments from api

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
