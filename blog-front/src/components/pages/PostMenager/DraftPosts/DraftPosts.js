import { Box, Grid, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import PostRow from "../../../ui/PostRow";
import PostSmallImg from "../../../ui/PostSmallImg";
import Category from "../../../ui/Category";
import useService from "../../../../services/posts/useService";
import useError from "../../../hooks/useError";
import { NewPostDialog } from "../../../ui/NewPost";

function DraftPosts({ posts, setPosts }) {
  const { handleError } = useError();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {posts.map((post) => {
          console.log(post);
          return (
            <Grid item xs={4} key={post.id}>
              <DraftSmallPost key={post.id} post={post} setPosts={setPosts} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default DraftPosts;

function DraftSmallPost({ post, setPosts }) {
  const { handleError } = useError();
  const { DeletePost } = useService();

  const [open, setOpen] = useState(false);

  return (
    <Paper style={{ borderRadius: "1rem", overflow: "hidden" }}>
      {post.image ? (
        <img
          src={post.image}
          alt="zdjęcie"
          style={{
            objectFit: "cover",
            verticalAlign: "top",
            height: "280px",
            width: "100%",
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "280px",
            width: "100%",
            backgroundColor: grey[400],
          }}
        >
          <EditIcon style={{ fontSize: "5rem" }} />
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0.5rem",
        }}
      >
        <div>
          {post.category && <Category category={post.category} />}
          <p style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
            {post.title}
          </p>
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            color="info"
            onClick={() => {
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              DeletePost({ id: post.id })
                .then((res) => {
                  setPosts((prev) => prev.filter((p) => p.id !== post.id));
                })
                .catch((err) => {
                  handleError(err);
                });
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <NewPostDialog open={open} setOpen={setOpen} post={post} />
    </Paper>
  );
}
