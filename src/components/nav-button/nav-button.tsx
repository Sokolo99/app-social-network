import React from "react";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  icon: JSX.Element;
  href: string;
};

function NavButton({ children, icon, href }: Props) {
  return (
    <Button
      className="flex justify-start text-xl bg-transparent border-none shadow-none"
      startContent={icon}
    >
      <Link to={href}>{children}</Link>
    </Button>
  );
}
// убрал бордеры у конопки
// вернуться сюда если нужно будет поменять иконку в конпке
export default NavButton;
