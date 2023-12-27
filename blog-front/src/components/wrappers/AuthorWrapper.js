import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Author from "../pages/Author";
import NotFound from "../pages/NotFound";
import Loading from "../ui/Loading";
import useService from "../../services/author/useService";
import usePostService from "../../services/posts/useService";
import { useNotification } from "../hooks/useNotification";
import useError from "../hooks/useError";

function AuthorWrapper() {
  const { id } = useParams();
  const { setLoader } = useNotification();
  const authorService = useService();
  const postService = usePostService();
  const { handleError } = useError();

  const [authorData, setAuthorData] = useState();
  const [authorPosts, setAuthorPosts] = useState();

  useEffect(() => {
    setLoader(true);

    const fetchAuthorById = () => authorService.GetAuthorById({ id });

    const fetchPostsByAuthorId = () =>
      postService.GetApprovedPostsByAuthorId({ authorId: id });

    const fetchImage = (post) => {
      return postService
        .GetImage({ id: post.mainPhotoId })
        .then((image) => {
          post.image = image;
        })
        .catch((error) => {
          post.image = null;
          handleError(error);
        });
    };

    fetchAuthorById()
      .then((authorResponse) => {
        setAuthorData(authorResponse);
        return fetchPostsByAuthorId();
      })
      .then((postsResponse) => {
        const fetchImagePromises = postsResponse.map(fetchImage);
        return Promise.all(fetchImagePromises).then(() => {
          setAuthorPosts(postsResponse);
        });
      })
      .catch((error) => {
        handleError(error);
        setAuthorData(false);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [id]);

  if (authorData === undefined) return null;
  if (authorData === false) return <NotFound />;
  return <Author authorData={authorData} posts={authorPosts} />;
}

export default AuthorWrapper;
