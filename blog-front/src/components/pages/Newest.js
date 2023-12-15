import { useEffect } from "react";
import useAPI from "../hooks/useAPI";

export default function Newest() {
	const useapi = useAPI();

	useEffect(() => {
		useapi
			.get(
				"https://localhost:7007/api/Posts/GetImage?id=65782ae1e279c5fbbe16f46a"
			)
			.then((response) => {
				console.log(response);
			});
	}, []);

	return <>newest</>;
}
