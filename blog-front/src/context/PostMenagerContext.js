import React, { createContext, useMemo, useState } from "react";

export const PostManagerContext = createContext();

export function PostManagerProvider({ children }) {
  const [draftPosts, setDraftPosts] = useState([]);
  const [newPost, setNewPost] = useState();
  const [approvedPosts, setApprovedPosts] = useState();
  const [waitingPosts, setWaitingPosts] = useState();

  return (
    <PostManagerContext.Provider
      value={useMemo(
        () => ({
          draftPosts,
          setDraftPosts,
          newPost,
          setNewPost,
          approvedPosts,
          setApprovedPosts,
          waitingPosts,
          setWaitingPosts,
        }),
        [
          draftPosts,
          setDraftPosts,
          newPost,
          setNewPost,
          approvedPosts,
          setApprovedPosts,
          waitingPosts,
          setWaitingPosts,
        ],
      )}
    >
      {children}
    </PostManagerContext.Provider>
  );
}
