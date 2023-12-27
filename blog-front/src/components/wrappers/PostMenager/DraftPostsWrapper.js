import React, { Component, useEffect, useState } from "react";
import useService from "../../../services/posts/useService";
import useError from "../../hooks/useError";
import { useNotification } from "../../hooks/useNotification";
import NotFound from "../../pages/NotFound";
import DraftPosts from "../../pages/PostMenager/DraftPosts/DraftPosts";

export default function DraftPostsWrapper({ triggerEffect, setTriggerEffect }) {
  const postsService = useService();
  const { setLoader, state } = useNotification();
  const { handleError } = useError();

  const [draftPosts, setDraftPosts] = useState();

  const fetchData = async () => {
    setLoader(true);
    const fetchPosts = async () => postsService.GetDraftPosts();

    const fetchImage = (post) => {
      if (!post.mainPhotoId) return null;
      return postsService
        .GetImage({ id: post.mainPhotoId })
        .then((image) => {
          post.image = image;
        })
        .catch((error) => {
          post.image = null;
          handleError(error);
        });
    };

    const fetchImageInfo = (post) => {
      if (!post.mainPhotoId) return null;

      return postsService
        .GetImageInfo({ id: post.mainPhotoId })
        .then((imageInfo) => {
          post.imageInfo = imageInfo;
        })
        .catch((error) => {
          post.imageInfo = null;
          handleError(error);
        });
    };

    fetchPosts()
      .then((postsResponse) => {
        const fetchImagePromises = postsResponse.map(fetchImage);
        const fetchImageInfoPromises = postsResponse.map(fetchImageInfo);
        return Promise.all([
          Promise.all(fetchImagePromises),
          Promise.all(fetchImageInfoPromises),
        ]).then(() => {
          setDraftPosts(postsResponse);
        });
      })
      .catch((error) => {
        handleError(error);
        setDraftPosts(false);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [triggerEffect]);

  if (draftPosts === undefined) return null;
  if (draftPosts === false) return <NotFound />;
  return (
    <DraftPosts
      posts={draftPosts}
      setPosts={setDraftPosts}
      setTriggerEffect={setTriggerEffect}
    />
  );
}
