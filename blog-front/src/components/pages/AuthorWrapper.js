import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Author from "./Author";
import NotFound from "./NotFound";

function AuthorWrapper() {
  const { name } = useParams();
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    // Make an API call to retrieve the author data
    fetch(`/api/authors/${name}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Author not found");
        }
      })
      .then((data) => {
        setAuthorData(data);
      })
      .catch((error) => {
        console.error(error);
        setAuthorData(false); // Set authorData to false if the author data is not found
      });
  }, [name]);

  if (authorData === null) {
    return null; // Render nothing until the author data is loaded
  } else if (authorData === false) {
    return <NotFound />; // Render the NotFound component if the author data is not found
  } else {
    return <Author authorData={authorData} />; // Render the Author component with the author data
  }
}

export default AuthorWrapper;
