import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ApprovedPosts from "../../pages/PostMenager/ApprovedPosts/ApprovedPosts";
import { useNotification } from "../../hooks/useNotification";
import useService from "../../../services/posts/useService";
import useError from "../../hooks/useError";
import NotFound from "../../pages/NotFound";
import { PostManagerContext } from "../../../context/PostMenagerContext";
import usePostMenager from "../../hooks/usePostMenager";

export default function ApprovedPostsWrapper() {
  const { fetchApprovedPosts, approvedPosts } = usePostMenager();

  useEffect(() => {
    fetchApprovedPosts();
  }, []);

  if (approvedPosts === undefined || approvedPosts === null) return null;
  if (approvedPosts === false) return <NotFound />;
  return <ApprovedPosts posts={approvedPosts} />;
}
