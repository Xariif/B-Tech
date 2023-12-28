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
import Top from "../pages/Top";

export default function TopWrapper() {
  const [posts, setPosts] = useState();

  const [from, setFrom] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  );
  const [to, setTo] = useState(new Date());

  const { setLoader } = useNotification();
  const postsService = useService();
  const { handleError } = useError();

  useEffect(() => {
    setLoader(true);

    const fetchPosts = () => postsService.GetTopApprovedPosts({ from, to });
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
  }, [from, to]);

  if (posts === undefined) return null;
  if (posts === false) return <NotFound />;
  return (
    <Top posts={posts} from={from} setFrom={setFrom} to={to} setTo={setTo} />
  );
}
