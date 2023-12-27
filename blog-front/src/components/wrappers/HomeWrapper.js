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

  const { setLoader } = useNotification();
  const postsService = useService();
  const { handleError } = useError();

  useEffect(() => {
    setLoader(true);
    const fetchPosts = async () => postsService.GetApprovedPosts();

    const fetchImage = (post) => {
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
          setPosts(postsResponse);
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
  return <Home posts={posts} />;
}
