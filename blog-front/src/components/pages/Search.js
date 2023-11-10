import { useParams } from "react-router-dom";
import Loading from "../ui/Loading";
import { useEffect } from "react";

export default function Search(props) {
	const { term } = useParams();

	useEffect(() => {}, []);
	return (
		<>
			<h1>Searching term: {term}</h1>
			<Loading />
		</>
	);
}
