import { Spinner } from "@nextui-org/react";

import { useCurrentQuery } from "@/app/services/userApi.ts";

function AuthGuard({ children }: { children: JSX.Element }) {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return children;
}

export default AuthGuard;
