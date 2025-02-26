import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@heroui/input";
import { Button } from "@nextui-org/react";
import { IoMdCreate } from "react-icons/io";
import { useParams } from "react-router-dom";

import ErrorMessage from "@/components/error-message/error-message.tsx";
import { useLazyGetPostByIdQuery } from "@/app/services/postsApi.ts";
import { useCreateCommentMutation } from "@/app/services/commentsApi.ts";

function CreateComment() {
  const { id } = useParams<{ id: string }>();
  const [createComment] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const error = errors?.post?.message as string;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap();
        setValue("comment", "");
        await getPostById(id).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        control={control}
        defaultValue=""
        name="comment"
        render={({ field }) => (
          <Textarea
            {...field}
            className="mb-5"
            labelPlacement="outside"
            placeholder="Напишите свой комментарий"
          />
        )}
        rules={{
          required: "Обязательное поле",
        }}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        className="flex-end"
        color="primary"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Ответить
      </Button>
    </form>
  );
}

export default CreateComment;
