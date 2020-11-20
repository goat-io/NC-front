import { Instance, types } from "mobx-state-tree";

import { Profile } from "./Profile";

export const User = types.model("User", {
  phoneNumber: types.string,
  profilePicture: types.maybe(types.union(types.string, types.null)),
  displayName: types.maybe(types.union(types.string, types.null)),
  token: types.maybe(types.string),
  refreshToken: types.maybe(types.string),
  profile: types.maybe(Profile),
});

export type UserType = Instance<typeof User>;
