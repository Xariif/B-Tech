import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Author from "../pages/Author";
import NotFound from "../pages/NotFound";
import AuthorService from "../../services/AuthorService";
import Loading from "../ui/Loading";

function AuthorWrapper() {
	const { GetAuthorById } = AuthorService();
	const { id } = useParams();

	const [authorData, setAuthorData] = useState(null);

	useEffect(() => {
		GetAuthorById({ id })
			.then((res) => {
				setAuthorData(res);
			})
			.catch((err) => {
				setAuthorData(false);
			});
	}, [id]);

	if (authorData === null || authorData === undefined) {
		return <Loading />;
	} else if (authorData === false) {
		return <NotFound />;
	} else {
		return <Author authorData={authorData} />;
	}
}

export default AuthorWrapper;
