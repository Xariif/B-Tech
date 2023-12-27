import React, { useEffect, useState } from "react";
import useService from "../../../services/posts/useService";
import useError from "../../hooks/useError";
import { useNotification } from "../../hooks/useNotification";
import NotFound from "../../pages/NotFound";
import DraftPosts from "../../pages/PostMenager/DraftPosts/DraftPosts";

export default function DraftPostsWrapper() {
  const postsService = useService();
  const { setLoader } = useNotification();
  const { handleError } = useError();

  const [posts, setPosts] = useState();

  useEffect(() => {
    setLoader(true);
    const fetchPostsAndImages = async () => {
      const approvedPosts = await postsService.GetDraftPosts();
      const imagePromises = approvedPosts.map((post) => {
        if (!post.mainPhotoId) return null;
        return postsService.GetImage({ id: post.mainPhotoId });
      });
      const images = await Promise.all(imagePromises);
      const updatedPosts = approvedPosts.map((post, i) => {
        return {
          ...post,
          image: images[i],
        };
      });

      return updatedPosts;
    };

    Promise.all([fetchPostsAndImages()])
      .then((data) => {
        setPosts(data[0]);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  if (posts === undefined) return null;
  if (posts === false) return <NotFound />;
  return <DraftPosts posts={posts} setPosts={setPosts} />;
}
