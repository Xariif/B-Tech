import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../pages/NotFound";
import Post from "../pages/Post";

import Loading from "../ui/Loading";
import PostBigImg from "../ui/PostBigImg";
import { useNotification } from "../hooks/useNotification";
import useService from "../../services/posts/useService";
import useError from "../hooks/useError";
import Home from "../pages/Home";

export default function HomeWrapper() {
  const [posts, setPosts] = useState();

  const notification = useNotification();
  const postsService = useService();
  const { handleError } = useError();

  const arrayBufferToBase64 = (buffer) => {
    const binary = [];
    const bytes = new Uint8Array(buffer);
    bytes.forEach((byte) => binary.push(String.fromCharCode(byte)));
    return `data:image/jpeg;base64,${window.btoa(binary.join(""))}`;
  };

  useEffect(() => {
    notification.setLoader(true);
    postsService
      .GetApprovedPosts()
      .then((response) => {
        const postsWithImgs = response.map((post) =>
          postsService
            .GetImage({ id: post.mainPhotoId })
            .then((image) => {
              post.image = arrayBufferToBase64(image);
              return post;
            })
            .catch((e) => {
              post.image = null;
              handleError(e);
              return post;
            }),
        );

        Promise.all(postsWithImgs).then((postsWithImages) => {
          setPosts(postsWithImages);
        });
      })
      .catch((error) => {
        handleError(error);
        setPosts(false);
      })
      .finally(() => {
        notification.setLoader(false);
      });
  }, []);

  if (posts === undefined) return null;
  if (posts === false) return <NotFound />;
  return <Home posts={posts} />;
}
