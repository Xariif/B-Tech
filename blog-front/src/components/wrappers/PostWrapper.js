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

  const arrayBufferToBase64 = (buffer) => {
    const binary = [];
    const bytes = new Uint8Array(buffer);
    bytes.forEach((byte) => binary.push(String.fromCharCode(byte)));
    return `data:image/jpeg;base64,${window.btoa(binary.join(""))}`;
  };

  useEffect(() => {
    setLoader(true);

    postsService
      .GetApprovedPostById({ id })
      .then((response) => {
        const fetchImagePromises = response.map((p) => {
          postsService
            .GetImage({ id: post.mainPhotoId })
            .then((image) => {
              p.image = arrayBufferToBase64(image);
            })
            .catch((e) => {
              p.image = null;
              handleError(e);
            });

          return p;
        });

        Promise.all(fetchImagePromises).then((res) => {
          setPost(res);
        });
      })
      .catch((error) => {
        handleError(error);
        setPost(false);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [id]);

  if (post === undefined) return null;
  if (post === false) return <NotFound />;
  return <Post postData={post} />;
}
