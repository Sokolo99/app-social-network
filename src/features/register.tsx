import { useForm } from "react-hook-form";
import { Link } from "@nextui-org/react";
import { Button } from "@heroui/react";
import { useState } from "react";

import Input from "@/components/input/input.tsx";
import { useRegisterMutation } from "@/app/services/userApi.ts";
import { hasErrorField } from "@/utils/has-error-field.ts";
import ErrorMessage from "@/components/error-message/error-message.tsx";

type Register = {
  email: string;
  name: string;
  password: string;
};

type Props = {
  setSelected: (value: string) => void;
};

function Register({ setSelected }: Props) {
  const {
    handleSubmit,
    control,
    // @ts-ignore
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState("");

  const onSubmit = async (data: Register) => {
    try {
      await register(data).unwrap();
      setSelected("login");
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        label="Имя"
        name="name"
        required="Обязательное поле"
        type="text"
      />
      <Input
        control={control}
        label="Email"
        name="email"
        required="Обязательное поле"
        type="email"
      />
      <Input
        control={control}
        label="Пароль"
        name="password"
        required="Обязательное поле"
        type="password"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Уже есть аккаунт?{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected("login")}
        >
          Войдите
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" isLoading={isLoading} type="submit">
          Зарегистрируйтесь
        </Button>
      </div>
    </form>
  );
}

export default Register;
