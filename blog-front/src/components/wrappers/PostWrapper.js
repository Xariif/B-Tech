import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../pages/NotFound";
import Post from "../pages/Post";

import Loading from "../ui/Loading";
import PostBigImg from "../ui/PostBigImg";
import { useNotification } from "../hooks/useNotification";
import useService from "../../services/posts/useService";
import useError from "../hooks/useError";

export default function PostWrapper({ children }) {
  const { id } = useParams();

  const [post, setPost] = useState();

  const { setLoader } = useNotification();
  const postsService = useService();
  const { handleError } = useError();

  useEffect(() => {
    setLoader(true);

    const fetchPost = async () => {
      const approvedPost = await postsService.GetApprovedPostById({ id });
      approvedPost.image = await postsService.GetImage({
        id: approvedPost.mainPhotoId,
      });

      return approvedPost;
    };

    Promise.all([fetchPost()])
      .then((data) => {
        setPost(data[0]);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    function findCookieByID(findId) {
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const [cookieName, cookieValue] = cookie.split("=");

        if (cookieName?.includes(findId)) {
          return { name: cookieName, value: cookieValue };
        }
      }
      return null;
    }

    const foundCookie = findCookieByID(id);

    if (foundCookie === null) {
      const date = new Date();
      date.setTime(date.getTime() + 1000 * 60 * 60 * 24);
      document.cookie = `${id}=viewed; expires=${date.toUTCString()}; path=/`;
      postsService.IncreaseViews({ id });
    }
  }, []);

  if (post === undefined) return null;
  if (post === false) return <NotFound />;
  return <Post postData={post} />;
}
