import { useState } from "react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Login from "@/features/login.tsx";
import Register from "@/features/register.tsx";

function Auth() {
  const [selected, setSelected] = useState("login");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              selectedKey={selected}
              size="md"
              onSelectionChange={(key) => setSelected(key as string)}
            >
              <Tab key="login" title="Вход">
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key="sign-up" title="Регистрация">
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Auth;
