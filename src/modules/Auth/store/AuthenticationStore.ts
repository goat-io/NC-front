import { ProfileType, ProfileTypeOmitId } from "./types/Profile";
import { User, UserType } from "./types/User";
import { flow, types } from "mobx-state-tree";

import React from "react";
import { Users } from "../../../api/Users";
import to from "await-to-js";

export const AuthStore = types
  .model("AuthStore", {
    user: types.maybe(User),
  })
  .actions((self) => ({
    logOut: () => {
      self.user = undefined;
    },
    setUser: (user: UserType) => {
      self.user = { ...user, token: self?.user?.token };
    },
    setLocalProfile: (profile: ProfileType) => {
      if (self.user) {
        self.user.profile = profile;
      }
    },
    setToken: (token: string) => {
      if (self.user) {
        self.user.token = token;
      }
    },
    getAuthToken: () => {
      return self.user && self.user.token;
    },
    getRefreshToken: () => {
      return self.user && self.user.refreshToken;
    },
  }))
  .actions((self) => ({
    setProfile: flow(function* fetchProjects(profile: ProfileTypeOmitId) {
      if (!self.user?.profile?.id) {
        throw new Error("The user has no profile");
      }
      const [error, savedProfile] = yield to(
        Users.setProfile({
          userId: self.user?.profile?.id,
          profile,
        })
      );

      if (error) {
        throw error;
      }

      self.setLocalProfile(savedProfile);
      return savedProfile as ProfileType;
    }),
  }))
  .views((self) => ({
    get isAuthenticated() {
      return !!self.user;
    },
  }));

export const AuthStoreInstance = AuthStore.create({});

export const authenticationContext = React.createContext({
  AuthStore: AuthStoreInstance,
});

export const useAuthStore = () => React.useContext(authenticationContext);
