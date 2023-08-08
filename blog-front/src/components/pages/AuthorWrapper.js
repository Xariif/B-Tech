import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Author from "./Author";
import NotFound from "./NotFound";
import { GetAuthorById } from "../../services/AuthorService";

function AuthorWrapper() {
	const { id } = useParams();

	const [authorData, setAuthorData] = useState(null);

	useEffect(() => {
		GetAuthorById({ id }).then((res) => {
			if (res === null) {
				setAuthorData(false);
			} else {
				setAuthorData(res.data);
			}
		});
	}, [id]);

	if (authorData === null) {
		return <>Skeleton</>;
	} else if (authorData === false) {
		return <NotFound />;
	} else {
		return <Author authorData={authorData} />;
	}
}

export default AuthorWrapper;
