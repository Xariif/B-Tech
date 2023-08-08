import { useEffect, useState } from "react";
import { GetPosts } from "../../services/PostService";
import { GetAuthorById } from "../../services/AuthorService";
import { Link } from "react-router-dom";
import PostBigImg from "./PostBigImg";

function HomePost({ PostData }) {
	const [author, setAuthor] = useState(null);
	useEffect(() => {
		GetAuthorById({ id: PostData.authorId }).then((res) => {
			setAuthor(res.data);
		});
	}, []);

	if (author == null) return null;
	else {
		return <PostBigImg postData={PostData} author={author} />;
	}
}

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
	return (
		<div style={{ maxWidth: "1180px", margin: "0 auto" }}>
			{Posts.map((element) => {
				return <HomePost PostData={element} key={element.id} />;
			})}
		</div>
	);
}
