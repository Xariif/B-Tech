import { useEffect, useState } from "react";
import ApprovedPosts from "../../pages/PostMenager/ApprovedPosts/ApprovedPosts";
import { useNotification } from "../../hooks/useNotification";
import useService from "../../../services/posts/useService";
import useError from "../../hooks/useError";
import NotFound from "../../pages/NotFound";

export default function WaitingForApprovalWrapper() {
  const [posts, setPosts] = useState();

  const { setLoader } = useNotification();
  const postsService = useService();
  const { handleError } = useError();

  useEffect(() => {
    setLoader(true);
    const fetchPostsAndImages = async () => {
      const approvedPosts = await postsService.GetPostWaitingForApproval();
      const imagePromises = approvedPosts.map((post) => {
        return postsService.GetImage({ id: post.mainPhotoId });
      });

      const images = await Promise.all(imagePromises);
      return approvedPosts.map((post, i) => {
        return {
          ...post,
          image: images[i],
        };
      });
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
