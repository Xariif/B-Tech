import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import useService from "../../../../services/posts/useService";
import { useNotification } from "../../../hooks/useNotification";
import useError from "../../../hooks/useError";
import PostSmallImg from "../../../ui/PostSmallImg";

function ApprovedPosts({ posts }) {
  console.log(posts);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={4}>
        {posts.map((post) => (
          <PostSmallImg key={post.id} post={post} />
        ))}
      </Grid>
    </Grid>
  );
}

export default ApprovedPosts;
