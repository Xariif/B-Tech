import React, { Component, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Grid, IconButton } from "@mui/material";
import useService from "../../../services/posts/useService";
import useError from "../../hooks/useError";
import { useNotification } from "../../hooks/useNotification";
import NotFound from "../../pages/NotFound";
import DraftPosts from "../../pages/PostMenager/DraftPosts/DraftPosts";
import usePostMenager from "../../hooks/usePostMenager";
import PostSmallImg from "../../ui/PostSmallImg";

export default function DraftPostsWrapper() {
  const { fetchDraftPosts, draftPosts } = usePostMenager();
  useEffect(() => {
    fetchDraftPosts();
  }, []);

  if (draftPosts === undefined || draftPosts === null) return null;
  if (draftPosts === false) return <NotFound />;

  return <DraftPosts posts={draftPosts} />;
}
