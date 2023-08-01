import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Author from "./Author";
import NotFound from "./NotFound";
import {
	GetAuthorById,
	GetAuthorByNameSurname,
} from "../../services/AuthorService";

function AuthorWrapper() {

	const { id } = useParams();
	console.log(id);

	const [authorData, setAuthorData] = useState(null);

	useEffect(() => {
		// Make an API call to retrieve the author data

		GetAuthorById({ id }).then((res) => {
			console.log(res.data);
			if (res === null) {
				setAuthorData(false); // If the author data is not found, set authorData to false
			} else {
				setAuthorData(res.data); // Otherwise, set authorData to the returned data
			}
		});
	}, [id]);

	if (authorData === null) {
		return null; // Render nothing until the author data is loaded
	} else if (authorData === false) {
		return <NotFound />; // Render the NotFound component if the author data is not found
	} else {
		return <Author authorData={authorData} />; // Render the Author component with the author data
	}
}

export default AuthorWrapper;
