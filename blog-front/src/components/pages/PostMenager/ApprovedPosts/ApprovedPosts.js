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
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import useService from "../../../../services/posts/useService";
import { useNotification } from "../../../hooks/useNotification";
import useError from "../../../hooks/useError";
import PostSmallImg from "../../../ui/PostSmallImg";
import usePostMenager from "../../../hooks/usePostMenager";

function ApprovedPosts({ posts }) {
  const postService = useService();
  const { fetchApprovedPosts } = usePostMenager();
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {posts.map((post) => {
        const [dialogOpen, setDialogOpen] = useState(false);

        return (
          <Grid item xs={4} key={post.id}>
            <PostSmallImg
              key={post.id}
              link
              post={post}
              options={
                <IconButton color="error" onClick={() => setDialogOpen(true)}>
                  <CloseIcon fontSize="large" />
                </IconButton>
              }
            />
            <Dialog
              fullWidth
              maxWidth="sm"
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
            >
              <DialogTitle>Approved post</DialogTitle>
              <DialogContent>
                <DialogContentText variant="h6" gutterBottom>
                  Do you want to cancel approve of this post? (it will be no
                  longer visible on main page)
                </DialogContentText>
                <DialogActions>
                  <Button
                    onClick={() => {
                      postService.CancelPost({ id: post.id }).then(() => {
                        fetchApprovedPosts().then(() => {
                          setDialogOpen(false);
                        });
                      });
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => {
                      setDialogOpen(false);
                    }}
                  >
                    No
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ApprovedPosts;
