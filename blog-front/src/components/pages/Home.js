import { useEffect, useState } from "react";
import PostService from "../../services/PostService";
import { GetAuthorById } from "../../services/AuthorService";
import { Link } from "react-router-dom";
import PostBigImg from "../ui/PostBigImg";
import PostSmallImg from "../ui/PostSmallImg";
import Tag from "../ui/Tag";

import { useAuth0 } from "@auth0/auth0-react";
import useAPI from "../hooks/useAPI";
export default function Home() {
	const api = useAPI();
	const [posts, setPosts] = useState([]);
	const { GetPosts } = PostService();

	const { getAccessTokenSilently, user, isAuthenticated, getIdTokenClaims } =
		useAuth0();

	useEffect(() => {
		GetPosts()
			.then((res) => {
				let mappedPosts = res.map((element) => {
					element.image =
						"https://picsum.photos/seed/" + element.id + "/1920/1080";

					return element;
				});

				setPosts(mappedPosts);
			})
			.catch((err) => console.log(err));
	}, []);

	const importantPosts = posts.filter((post) => post.tag === "important");

	const otherPosts = posts.filter((post) => post.tag !== "important");

	return (
		<>
			{importantPosts.length != 0 && <> important</>}

			{otherPosts.map((element) => {
				return <PostBigImg postData={element} key={element.id} />;
			})}
		</>
	);
}
