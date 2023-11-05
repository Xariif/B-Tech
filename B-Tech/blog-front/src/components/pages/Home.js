import { useEffect, useState } from "react";
import PostService from "../../services/PostService";
import { GetAuthorById } from "../../services/AuthorService";
import { Link } from "react-router-dom";
import PostBigImg from "../ui/PostBigImg";
import PostSmallImg from "../ui/PostSmallImg";
import Tag from "../ui/Tag";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

	if (isAuthenticated) {
		getAccessTokenSilently().then((res) => {});
		console.log(user);
		getIdTokenClaims().then((res) => {
			console.log(res);
		});
	}

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 740 },
			items: 3,
		},
		smallertablet: {
			breakpoint: { max: 740, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	const importantPosts = posts.filter((post) => post.tag === "important");

	const otherPosts = posts.filter((post) => post.tag !== "important");

	return (
		<>
			{posts.length != 0 && (
				<div
					style={{
						backgroundColor: "var(--surface-card)",
						borderRadius: "var(--border-radius)",
						padding: "1rem",
					}}
				>
					<div
						style={{
							margin: "0.5rem 5rem",
							opacity: "1.8",
						}}
					>
						<Tag tag="important" />
					</div>
					<Carousel
						responsive={responsive}
						infinite={true}
						arrows={false}
						autoPlay
						autoPlaySpeed={3000}
					>
						{importantPosts.map((element) => {
							return (
								<div
									style={{
										display: "flex",
										justifyContent: "center",
									}}
									key={element.id}
								>
									<PostSmallImg postData={element} />
								</div>
							);
						})}
					</Carousel>
				</div>
			)}

			{otherPosts.map((element) => {
				return <PostBigImg postData={element} key={element.id} />;
			})}
		</>
	);
}
