import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Author from "../pages/Author";
import NotFound from "../pages/NotFound";
import Loading from "../ui/Loading";
import useService from "../../services/author/useService";
import { useNotification } from "../hooks/useNotification";
import useError from "../hooks/useError";

function AuthorWrapper() {
  const { id } = useParams();
  const { setLoader } = useNotification();
  const authorService = useService();
  const { handleError } = useError();

  const [authorData, setAuthorData] = useState();

  useEffect(() => {
    setLoader(true);
    authorService
      .GetAuthorById({ id })
      .then((response) => {
        setAuthorData(response);
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
  return <Author authorData={authorData} />;
}

export default AuthorWrapper;
