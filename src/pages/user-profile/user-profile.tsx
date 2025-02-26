import { useParams } from "react-router-dom";
import { Button, Card, Image, useDisclosure } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import { resetUser, selectCurrent } from "@/features/userSlice.ts";
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "@/app/services/userApi.ts";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/app/services/followsApi.ts";
import GoBack from "@/components/go-back/go-back.tsx";
import { BASE_URL } from "@/constants.ts";
import ProfileInfo from "@/components/profile-info/profile-info.tsx";
import { formatToClientDate } from "@/utils/format-to-client-date.ts";
import CountInfo from "@/components/count-info/count-info.tsx";
import { EditProfile } from "@/components/edit-profile/edit-profile";

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useSelector(selectCurrent);
  const { data } = useGetUserByIdQuery(id ?? "");
  const [followUser] = useFollowUserMutation();
  const [unfolowUser] = useUnfollowUserMutation();
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(resetUser());
    },
    [],
  );

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfolowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap();

        await triggerGetUserByIdQuery(id);

        await triggerCurrentQuery();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id);
        await triggerCurrentQuery();
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <GoBack />
      <div className="flex items-stretch gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            alt={data.name}
            className="border-4 border-white"
            height={200}
            src={`${BASE_URL}${data.avatarUrl}`}
            width={200}
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                className="gap-2"
                color={data?.isFollowing ? "default" : "primary"}
                endContent={
                  data?.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
                variant="flat"
                onPress={handleFollow}
              >
                {data?.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />} onPress={() => onOpen()}>
                Редактировать
              </Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo info={data.email} title="Почта:" />
          <ProfileInfo info={data.location} title="Местоположение:" />
          <ProfileInfo
            info={
              data.dataOfBirth
                ? formatToClientDate(data.dataOfBirth)
                : "Не указано"
            }
            title="Дата рождения:"
          />
          <ProfileInfo info={data.bio} title="Обо мне:" />

          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Подписчики" />
            <CountInfo count={data.following.length} title="Подписки" />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} user={data} onClose={handleClose} />
    </>
  );
};
