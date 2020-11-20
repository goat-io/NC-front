import { useEffect, useState } from "react";

import { auth } from "../api/firebase";
import { notifyError } from "../components/notifications/error";
import to from "await-to-js";
import { useAuthStore } from "../modules/Auth/store/AuthenticationStore";
import { useObserver } from "mobx-react";

const useStores = () => {
  const { AuthStore } = useAuthStore();

  return useObserver(() => ({
    user: AuthStore.user,
    setUser: AuthStore.setUser,
    setToken: AuthStore.setToken,
  }));
};

export const useFirebaseUser = () => {
  const { user, setUser, setToken } = useStores();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const authStateChange = async (User: any) => {
      if ((user && user.profile) || !auth.currentUser) {
        setInitializing(false);
        return;
      }

      const [error, token] = await to(auth.currentUser?.getIdToken(true));

      if (error) {
        setInitializing(false);
        notifyError(error.message);
        return;
      }

      if (User && token) {
        setUser({
          phoneNumber: User.phoneNumber,
          profilePicture: User.photoURL,
          displayName: User.displayName,
          profile: user?.profile,
          token,
          refreshToken: User.refreshToken,
        });
        setToken(token);
        setInitializing(false);
        return;
      }
    };

    return auth.onAuthStateChanged(authStateChange);
  }, [user, setUser, setToken]);

  return {
    initializing,
  };
};
