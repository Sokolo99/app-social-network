import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";

import { selectCurrent } from "@/features/userSlice.ts";
import User from "@/components/user";

function Followers() {
  const currentUser = useSelector(selectCurrent);

  if (!currentUser) {
    return null;
  }

  return currentUser.followers.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.followers.map((user) => (
        <Link key={user.follower.id} to={`/users/${user.follower.id}`}>
          <Card>
            <CardBody className="block">
              <User
                avatarUrl={user.follower.avatarUrl ?? ""}
                description={user.follower.email ?? ""}
                name={user.follower.name ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h1>У вас нет подписчиков</h1>
  );
}

export default Followers;
