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
import Edit from "../../../ui/PostDialog/Edit";
import usePostMenager from "../../../hooks/usePostMenager";
import useNotification from "../../../hooks/useNotification";

function DraftPosts({ posts }) {
  const { fetchDraftPosts, draftPosts } = usePostMenager();
  const { DeletePost } = useService();
  const { removeDraftPost } = usePostMenager();
  const { handleError } = useError();
  const notification = useNotification();

  const [editingPost, setEditingPost] = useState(null);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {posts.map((post) => {
          return (
            <Grid item xs={4} key={post.id}>
              <PostSmallImg
                post={post}
                options={
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
                        setEditingPost(post);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        DeletePost({ id: post.id })
                          .then((res) => {
                            removeDraftPost(post.id);
                          })
                          .catch((err) => {
                            handleError(err);
                          });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    {editingPost && editingPost.id === post.id && (
                      <Edit
                        post={editingPost}
                        editDialogOpen={editingPost !== null}
                        setEditDialogOpen={() => setEditingPost(null)}
                      />
                    )}
                  </div>
                }
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
export default DraftPosts;
