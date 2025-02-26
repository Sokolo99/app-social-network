import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";

import { selectCurrent } from "@/features/userSlice.ts";
import User from "@/components/user";

function Following() {
  const currentUser = useSelector(selectCurrent);

  if (!currentUser) {
    return null;
  }

  return currentUser.following.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map((user) => (
        <Link key={user.following.id} to={`/users/${user.following.id}`}>
          <Card>
            <CardBody className="block">
              <User
                avatarUrl={user.following.avatarUrl ?? ""}
                description={user.following.email ?? ""}
                name={user.following.name ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h1>У вас нет подписок</h1>
  );
}

export default Following;
