import { useForm } from "react-hook-form";
import { Link } from "@nextui-org/react";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Input from "@/components/input/input.tsx";
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from "@/app/services/userApi.ts";
import ErrorMessage from "@/components/error-message/error-message.tsx";
import { hasErrorField } from "@/utils/has-error-field.ts";

type Login = {
  email: string;
  password: string;
};

type Props = {
  setSelected: (value: string) => void;
};

function Login({ setSelected }: Props) {
  const {
    handleSubmit,
    control,
    // @ts-ignore
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState(" ");
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap();
      await triggerCurrentQuery().unwrap();
      navigate("/");
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
        Нет аккаунта?{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected("sign-up")}
        >
          Зарегистрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" isLoading={isLoading} type="submit">
          Войти
        </Button>
      </div>
    </form>
  );
}

export default Login;
