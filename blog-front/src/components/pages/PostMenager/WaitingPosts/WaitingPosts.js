import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import useService from "../../../../services/posts/useService";
import { useNotification } from "../../../hooks/useNotification";
import useError from "../../../hooks/useError";
import PostSmallImg from "../../../ui/PostSmallImg";
import usePostMenager from "../../../hooks/usePostMenager";
import Post from "../../Post";

function WaitingPosts({ posts }) {
  const postService = useService();
  const { fetchWaitingPosts } = usePostMenager();
  const { handleError } = useError();
  const [editingPostId, setEditingPostId] = useState(null);

  const [previewOpen, setPreviewOpen] = useState();
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {posts.map((post) => {
        return (
          <Grid item xs={4} key={post.id}>
            <PostSmallImg
              key={post.id}
              post={post}
              options={
                <>
                  <IconButton
                    color="error"
                    onClick={() => setEditingPostId(post.id)}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    color="info"
                    onClick={() => setPreviewOpen((prev) => post)}
                  >
                    <SearchIcon fontSize="large" />
                  </IconButton>
                </>
              }
            />
          </Grid>
        );
      })}

      <Dialog
        maxWidth="lg"
        open={previewOpen !== undefined}
        onClose={() => setPreviewOpen(undefined)}
      >
        <DialogContent sx={{ p: 5 }}>
          <Post postData={previewOpen} />
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={editingPostId !== null}
        onClose={() => setEditingPostId(null)}
      >
        <DialogTitle>Waiting for approval</DialogTitle>
        <DialogContent>
          <DialogContentText variant="h6" gutterBottom>
            Do you want to delete this post from waiting list?
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() => {
                postService
                  .CancelPost({ id: editingPostId })
                  .then((res) => {
                    fetchWaitingPosts();
                  })
                  .catch((error) => {
                    handleError(error);
                  })
                  .finally(() => {
                    setEditingPostId(null);
                  });
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setEditingPostId(null);
              }}
            >
              No
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default WaitingPosts;
