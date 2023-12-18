import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PostBigImg from "../ui/PostBigImg";
import PostSmallImg from "../ui/PostSmallImg";
import Category from "../ui/Category";
import Loading from "../ui/Loading";
import useAPI from "../hooks/useAPI";
import useService from "../../services/posts/useService";

import NotFound from "./NotFound";
import { useNotification } from "../hooks/useNotification";

export default function Home({ posts }) {
  const {
    getAccessTokenSilently,
    user,
    isAuthenticated,
    getIdTokenClaims,
    isLoading,
  } = useAuth0();

  return (
    <Paper>
      {posts.map((post) => (
        <div key={post.id}>
          <PostBigImg post={post} />
        </div>
      ))}
    </Paper>
  );
}
