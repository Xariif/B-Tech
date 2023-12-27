import { useEffect, useState } from "react";
import ApprovedPosts from "../../pages/PostMenager/ApprovedPosts/ApprovedPosts";
import { useNotification } from "../../hooks/useNotification";
import useService from "../../../services/posts/useService";
import useError from "../../hooks/useError";
import NotFound from "../../pages/NotFound";

export default function ApprovedPostsWrapper() {
  const [posts, setPosts] = useState();

  const { setLoader } = useNotification();
  const postsService = useService();
  const { handleError } = useError();

  useEffect(() => {
    setLoader(true);
    const fetchPostsAndImages = async () => {
      const approvedPosts = await postsService.GetAuthorApprovedPosts();
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
  return <ApprovedPosts posts={posts} />;
}
