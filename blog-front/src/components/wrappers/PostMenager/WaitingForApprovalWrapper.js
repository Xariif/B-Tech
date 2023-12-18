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

  const arrayBufferToBase64 = (buffer) => {
    const binary = [];
    const bytes = new Uint8Array(buffer);
    bytes.forEach((byte) => binary.push(String.fromCharCode(byte)));
    return `data:image/jpeg;base64,${window.btoa(binary.join(""))}`;
  };

  useEffect(() => {
    setLoader(true);
    postsService
      .GetPostWaitingForApproval()
      .then((response) => {
        const fetchImagePromises = response.map((post) =>
          postsService
            .GetImage({ id: post.mainPhotoId })
            .then((image) => {
              post.image = arrayBufferToBase64(image);
            })
            .catch((e) => {
              post.image = null;
              handleError(e);
            }),
        );

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
  return <ApprovedPosts posts={posts} />;
}
