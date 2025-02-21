import React from "react";
import { Button as NextButton } from "@heroui/react";

type Props = {
  children: React.ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
};

function Button({ children, icon, className, type, fullWidth, color }: Props) {
  return (
    <NextButton
      className={className}
      color={color}
      fullWidth={fullWidth}
      size="lg"
      startContent={icon}
      type={type}
      variant="light"
    >
      {children}
    </NextButton>
  );
}

export default Button;
