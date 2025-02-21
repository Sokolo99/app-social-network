import { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";

import { ThemeContext } from "@/components/theme-provider";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Network Social</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex text-3xl cursor-pointer" onClick={toggleTheme}>
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
      </NavbarContent>
      <NavbarItem>

      </NavbarItem>
    </Navbar>
  );
}

export default Header;
