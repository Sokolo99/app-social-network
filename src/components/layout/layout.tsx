import { Outlet } from "react-router-dom";

import Container from "../container/container.tsx";

import Header from "@/components/header/header.tsx";
import NavBar from "@/components/nav-bar/nav-bar.tsx";

function Layout() {
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </Container>
    </>
  );
}

export default Layout;
