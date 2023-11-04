import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useEffect } from "react";

export default function Search(props) {
	const { term } = useParams();

	useEffect(() => {}, []);
	return (
		<>
			<h1>Search: {term}</h1>
			<Loading />
		</>
	);
}
