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
    const fetchPostsAndImages = async () => {
      const approvedPosts = await postsService.GetApprovedPosts();
      const imagePromises = approvedPosts.map((post) => {
        return postsService.GetImage({ id: post.mainPhotoId });
      });

      const images = await Promise.all(imagePromises);
      const updatedPosts = approvedPosts.map((post, i) => {
        return {
          ...post,
          image: images[i],
        };
      });
      console.log(updatedPosts);
      setPosts(updatedPosts);
    };

    fetchPostsAndImages();

    setLoader(false);
  }, []);

  if (posts === undefined) return null;
  if (posts === false) return <NotFound />;
  return <Home posts={posts} />;
}
