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
    authorService
      .GetAuthorById({ id })
      .then((response) => {
        setAuthorData(response);
      })
      .then(() => {
        postService
          .GetApprovedPostsByAuthorId({ authorId: id })
          .then((response) => {
            const fetchImagePromises = response.map((post) =>
              postService
                .GetImage({ id: post.mainPhotoId })
                .then((image) => {
                  console.log(image);
                  post.image = image;
                })
                .catch((e) => {
                  post.image = null;
                  handleError(e);
                }),
            );

            Promise.all(fetchImagePromises).then(() => {
              setAuthorPosts(response);
            });
          })
          .catch((error) => {
            handleError(error);
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
