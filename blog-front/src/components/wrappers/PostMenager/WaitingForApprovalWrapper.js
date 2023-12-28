import { useEffect, useState } from "react";
import ApprovedPosts from "../../pages/PostMenager/ApprovedPosts/ApprovedPosts";
import { useNotification } from "../../hooks/useNotification";
import useService from "../../../services/posts/useService";
import useError from "../../hooks/useError";
import NotFound from "../../pages/NotFound";
import WaitingPosts from "../../pages/PostMenager/WaitingPosts/WaitingPosts";
import usePostMenager from "../../hooks/usePostMenager";

export default function WaitingForApprovalWrapper() {
  const { fetchWaitingPosts, waitingPosts } = usePostMenager();

  useEffect(() => {
    fetchWaitingPosts();
  }, []);

  if (waitingPosts === undefined || waitingPosts === null) return null;
  if (waitingPosts === false) return <NotFound />;
  return <WaitingPosts posts={waitingPosts} />;
}
