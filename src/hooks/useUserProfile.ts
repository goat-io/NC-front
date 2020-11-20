import { UserType } from "../modules/Auth/store/types/User";
import { Users } from "../api/Users";
import { notifyError } from "../components/notifications/error";
import to from "await-to-js";
import { useAuthStore } from "../modules/Auth/store/AuthenticationStore";
import { useEffect } from "react";
import { useObserver } from "mobx-react";

const useStore = () => {
  const { AuthStore } = useAuthStore();
  return useObserver(() => ({
    setLocalProfile: AuthStore.setLocalProfile,
  }));
};

export const useUserProfile = (authUser?: UserType) => {
  const { setLocalProfile } = useStore();

  useEffect(() => {
    const getMyProfile = async () => {
      const [error, me] = await to(Users.me());

      if (error) {
        notifyError(error.message);
        return;
      }

      if (me?.id) {
        setLocalProfile(me);
      }
    };

    if (authUser && authUser.token && authUser.token !== "") {
      getMyProfile();
    }
  }, [authUser, setLocalProfile]);
};
