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

  const arrayBufferToBase64 = (buffer) => {
    const binary = [];
    const bytes = new Uint8Array(buffer);
    bytes.forEach((byte) => binary.push(String.fromCharCode(byte)));
    return `data:image/jpeg;base64,${window.btoa(binary.join(""))}`;
  };

  useEffect(() => {
    setLoader(true);
    postsService
      .GetDraftPosts()
      .then((response) => {
        const fetchImagePromises = response.map((post) => {
          const postTest = post;

          postsService
            .GetImage({ id: post.mainPhotoId })
            .then((image) => {
              postTest.image = arrayBufferToBase64(image);
            })
            .catch((e) => {
              postTest.image = null;
              handleError(e);
            });
          return postTest;
        });

        Promise.all(fetchImagePromises).then(() => {
          setPosts(response);
        });
      })
      .catch((error) => {
        handleError(error);
        setPosts(false);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  if (posts === undefined) return null;
  if (posts === false) return <NotFound />;
  return <DraftPosts posts={posts} />;
}
