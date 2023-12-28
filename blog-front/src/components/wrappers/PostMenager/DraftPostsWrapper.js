import React, { Component, useEffect, useState } from "react";
import useService from "../../../services/posts/useService";
import useError from "../../hooks/useError";
import { useNotification } from "../../hooks/useNotification";
import NotFound from "../../pages/NotFound";
import DraftPosts from "../../pages/PostMenager/DraftPosts/DraftPosts";
import usePostMenager from "../../hooks/usePostMenager";

export default function DraftPostsWrapper() {
  const { fetchDraftPosts, draftPosts } = usePostMenager();

  useEffect(() => {
    fetchDraftPosts();
  }, []);

  if (draftPosts === undefined || draftPosts === null) return null;
  if (draftPosts === false) return <NotFound />;
  return <DraftPosts posts={draftPosts} />;
}
