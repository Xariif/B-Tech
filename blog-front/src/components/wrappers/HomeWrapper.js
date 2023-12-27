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

    const fetchPosts = () => postsService.GetApprovedPosts();
    const fetchImage = (post) =>
      postsService.GetImage({ id: post.mainPhotoId });

    const fetchPostsAndImages = () => {
      return fetchPosts()
        .then((approvedPosts) => {
          const imagePromises = approvedPosts.map(fetchImage);
          return Promise.all(imagePromises).then((images) =>
            approvedPosts.map((post, i) => ({
              ...post,
              image: images[i],
            })),
          );
        })
        .then((postsWithImages) => {
          setPosts(postsWithImages);
        })
        .catch((error) => {
          handleError(error);
          setPosts(false);
        })
        .finally(() => {
          setLoader(false);
        });
    };

    fetchPostsAndImages();
  }, []);

  if (posts === undefined) return null;
  if (posts === false) return <NotFound />;
  return <Home posts={posts} />;
}
