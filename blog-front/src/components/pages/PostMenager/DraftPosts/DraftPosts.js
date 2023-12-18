import PostRow from "../../../ui/PostRow";

function DraftPosts({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <PostRow key={post.id} post={post} />
      ))}
    </>
  );
}

export default DraftPosts;
