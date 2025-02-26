import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { MdOutlineEmail } from "react-icons/md";
import { Textarea } from "@heroui/input";

import Input from "@/components/input/input.tsx";
import { ThemeContext } from "@/components/theme-provider";
import { useUpdateUserMutation } from "@/app/services/userApi.ts";
import { User } from "@/app/types.ts";
import ErrorMessage from "@/components/error-message/error-message.tsx";
import { hasErrorField } from "@/utils/has-error-field.ts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
};

export const EditProfile: React.FC<Props> = ({
  isOpen = false,
  onClose = () => null,
  user,
}) => {
  const { theme } = useContext(ThemeContext);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();

  const { handleSubmit, control } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dataOfBirth: user?.dataOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmit = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData();

        data.name && formData.append("name", data.name);
        data.email &&
          data.email !== user?.email &&
          formData.append("email", data.email);
        data.dataOfBirth &&
          formData.append(
            "dataOfBirth",
            new Date(data.dataOfBirth).toISOString(),
          );
        data.bio && formData.append("bio", data.bio);
        data.location && formData.append("location", data.location);
        selectedFile && formData.append("avatar", selectedFile);

        await updateUser({ userData: formData, id }).unwrap();
        onClose();
      } catch (err) {
        console.log(err);
        if (hasErrorField(err)) {
          setError(err.data.error);
        }
      }
    }
  };

  return (
    <Modal
      backdrop="blur"
      className={`${theme} text-foreground`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Изменения профиля
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  control={control}
                  endContent={<MdOutlineEmail />}
                  label="Email"
                  name="email"
                  type="email"
                />
                <Input control={control} label="Имя" name="name" type="text" />
                <input
                  name="avatarUrl"
                  placeholder="Выберете файл"
                  type="file"
                  onChange={handleFileChange}
                />
                <Input
                  control={control}
                  label="Дата Рождения"
                  name="dataOfBirth"
                  type="date"
                />
                <Controller
                  control={control}
                  name="bio"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Ваша биография"
                      rows={4}
                    />
                  )}
                />
                <Input
                  control={control}
                  label="Местоположение"
                  name="location"
                  type="text"
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    isLoading={isLoading}
                    type="submit"
                  >
                    Обновить профиль
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
