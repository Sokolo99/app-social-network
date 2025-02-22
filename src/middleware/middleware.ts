import { createListenerMiddleware } from "@reduxjs/toolkit";

import { UserApi } from "@/app/services/userApi.ts";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: UserApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token);
    }
  },
});
