import { User as NextUiUser } from "@nextui-org/react";

import { BASE_URL } from "@/constants.ts";

type Props = {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
};

function User({
  name = "",
  avatarUrl = "",
  description = "",
  className = "",
}: Props) {
  return (
    <NextUiUser
      avatarProps={{
        src: `${BASE_URL}${avatarUrl}`,
      }}
      className={className}
      description={description}
      name={name}
    />
  );
}

export default User;
