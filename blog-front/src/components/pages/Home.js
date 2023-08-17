import { useEffect, useState } from "react";
import { GetPosts } from "../../services/PostService";
import { GetAuthorById } from "../../services/AuthorService";
import { Link } from "react-router-dom";
import PostBigImg from "./PostBigImg";
import PostSmallImg from "./PostSmallImg";
import Tag from "../ui/Tag";
import { Carousel } from "primereact/carousel";

export default function Home() {
	const [Posts, setPosts] = useState([]);

	useEffect(() => {
		GetPosts()
			.then((res) => {
				res.data.map((element) => {
					element.image =
						"https://picsum.photos/seed/" + element.id + "/1920/1080";
				});
				setPosts(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const responsiveOptions = [
		{
			breakpoint: "1199px",
			numVisible: 2,
			numScroll: 1,
		},
		{
			breakpoint: "991px",
			numVisible: 2,
			numScroll: 1,
		},
		{
			breakpoint: "767px",
			numVisible: 1,
			numScroll: 1,
		},
	];

	return (
		<div style={{ maxWidth: "1180px", margin: "0 auto" }}>
			<div style={{ margin: "0px auto", overflowX: "auto" }}>
				<div style={{ margin: "0px 5rem 0.5rem" }}>
					<Tag tag="important" />
				</div>

				<Carousel
					value={Posts.sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
					)}
					responsiveOptions={responsiveOptions}
					circular={true}
					numVisible={4}
					numScroll={4}
					itemTemplate={(item) => (
						<PostSmallImg postData={item} key={item.id} />
					)}
				/>
			</div>

			{Posts.filter((post) => post.tag !== "important").map((element) => {
				console.log(element);

				return <PostBigImg postData={element} key={element.id} />;
			})}
		</div>
	);
}
