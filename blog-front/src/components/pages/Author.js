import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Author() {
  const { name } = useParams();
  const navigate = useNavigate();
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
        console.log(data);
        setAuthorData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [name, navigate]);

  if (authorData) {
    return (
      <div>
        <h1>Author: {authorData.name}</h1>
        {/* Render the author page content */}
      </div>
    );
  } else {
    return null; // Render nothing until the author data is loaded
  }
}

export default Author;