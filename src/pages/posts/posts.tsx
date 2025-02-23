import { useGetAllPostsQuery } from "@/app/services/postsApi.ts";
import Card from "@/components/card/card";
import CreatePost from "@/components/create-post/create-post.tsx";

function Posts() {
  const { data } = useGetAllPostsQuery();

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              likes,
              likedByUser,
              createdAt,
            }) => (
              <Card
                key={id}
                authorId={authorId}
                avatarUrl={author.avatarUrl ?? ""}
                cardFor="post"
                commentsCount={comments.length}
                content={content}
                createdAt={createdAt}
                id={id}
                likedByUser={likedByUser}
                likesCount={likes.length}
                name={author.name ?? ""}
              />
            ),
          )
        : null}
    </>
  );
}

export default Posts;
