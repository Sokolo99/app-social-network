import { Control, useController } from "react-hook-form";
import { Input as NextInput } from "@nextui-org/react";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<any>;
  required?: string;
  endContent?: JSX.Element;
};

function Input({
  name,
  label,
  placeholder,
  type = "text",
  control,
  required = "",
  endContent,
}: Props) {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  });

  return (
    <NextInput
      endContent={endContent}
      errorMessage={`${errors[name]?.message ?? ""}`}
      id={name}
      isInvalid={invalid}
      label={label}
      name={field.name}
      placeholder={placeholder}
      type={type}
      value={field.value || ""}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
}

export default Input;
