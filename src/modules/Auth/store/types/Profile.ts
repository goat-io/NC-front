import { Instance, types } from "mobx-state-tree";

export const Profile = types.model("UserProfile", {
  name: types.maybe(types.string),
  email: types.maybe(types.string),
  id: types.string,
});

export type ProfileType = Instance<typeof Profile>;
export type ProfileTypeOmitId = Omit<ProfileType, "id">;
