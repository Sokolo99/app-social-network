import { useParams } from "react-router-dom";

import { useGetPostByIdQuery } from "@/app/services/postsApi.ts";
import Card from "@/components/card/card";
import GoBack from "@/components/go-back/go-back.tsx";
import CreateComment from "@/components/create-comment/create-comment.tsx";

const CurrentPost = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetPostByIdQuery(params.id ?? "");

  if (!data) {
    return <h2>Поста не существует</h2>;
  }

  const {
    content,
    id,
    authorId,
    comments,
    likes,
    author,
    likedByUser,
    createdAt,
  } = data;

  return (
    <>
      <GoBack />
      <Card
        authorId={authorId}
        avatarUrl={author.avatarUrl ?? ""}
        cardFor="current-post"
        commentsCount={comments.length}
        content={content}
        createdAt={createdAt}
        id={id}
        likedByUser={likedByUser}
        likesCount={likes.length}
        name={author.name ?? ""}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map((comment) => (
              <Card
                key={comment.id}
                authorId={comment.userId}
                avatarUrl={comment.user.avatarUrl ?? ""}
                cardFor="comment"
                commentId={comment.id}
                content={comment.content}
                id={id}
                name={comment.user.name ?? ""}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default CurrentPost;
