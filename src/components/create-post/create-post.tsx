import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@heroui/input";
import { Button } from "@nextui-org/react";
import { IoMdCreate } from "react-icons/io";

import ErrorMessage from "@/components/error-message/error-message.tsx";
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "@/app/services/postsApi.ts";

function CreatePost() {
  const [createPost] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const error = errors?.post?.message as string;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPost({ content: data.post }).unwrap();
      setValue("post", "");
      await triggerAllPosts().unwrap();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        control={control}
        defaultValue=""
        name="post"
        render={({ field }) => (
          <Textarea
            {...field}
            className="mb-5"
            labelPlacement="outside"
            placeholder="О чем думаете?"
          />
        )}
        rules={{
          required: "Обязательное поле",
        }}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        className="flex-end"
        color="success"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Добавить пост
      </Button>
    </form>
  );
}

export default CreatePost;
