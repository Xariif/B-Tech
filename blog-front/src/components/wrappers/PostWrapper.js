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

    try {
      postsService.GetApprovedPostById({ id }).then((res) => {
        postsService
          .GetImage({ id: res.mainPhotoId })
          .then((image) => {
            res.image = arrayBufferToBase64(image);
            setPost(res);
          })
          .catch((e) => {
            res.image = null;
            handleError(e);
          });
      });
    } catch (error) {
      handleError(error);
      setPost(false);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    // search all coockies if there is a cookie with name "post" and if there is
    // a equal id cookie if is not then set a coockie and call a function
    // to increase a view count

    const cookies = document.cookie.split(";");

    function findCookieByID(findId) {
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Rozbij ciasteczko na nazwę i wartość
        const [cookieName, cookieValue] = cookie.split("=");
        // Sprawdź, czy wartość ciasteczka zawiera podane "id"
        if (cookieValue.includes(findId)) {
          return { name: cookieName, value: cookieValue };
        }
      }
      return null; // Zwraca null, jeśli nie znaleziono ciasteczka z podanym "id"
    }

    const foundCookie = findCookieByID(id);
    console.log(foundCookie);

    if (true) {
      const date = new Date();
      date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 7);
      document.cookie = `post=${id}; expires=${date.toUTCString()}; path=/`;
      postsService.IncreaseViews({ id });
    }
  }, []);

  if (post === undefined) return null;
  if (post === false) return <NotFound />;
  return <Post postData={post} />;
}
