import {
  ProfileType,
  ProfileTypeOmitId,
} from "../modules/Auth/store/types/Profile";

import { Axios } from "./axios";
import { getHeaders } from "./getHeaders";
import { getToken } from "./token";
import to from "await-to-js";

interface setProfileInterface {
  userId: string;
  profile: ProfileTypeOmitId;
}

export const Users = (() => {
  /**
   * Get user´s profile information
   */
  const me = async (): Promise<ProfileType> => {
    const [error, response] = await to(
      Axios({
        url: "/auth/me",
        headers: getHeaders(getToken()),
      })
    );

    if (error) {
      throw error;
    }

    return response?.data;
  };
  /**
   * Patch user´s profile information
   */
  const setProfile = async ({
    userId,
    profile,
  }: setProfileInterface): Promise<ProfileType> => {
    const [error, user] = await to(
      Axios({
        method: "PATCH",
        url: `/users/${userId}`,
        headers: getHeaders(getToken()),
        data: { ...profile },
      })
    );

    if (error) {
      throw error;
    }

    return user?.data as ProfileType;
  };

  return Object.freeze({
    me,
    setProfile,
  });
})();
