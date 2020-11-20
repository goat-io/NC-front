import { AuthStoreInstance } from "../modules/Auth/store/AuthenticationStore";

export const getToken = (): string => {
  return AuthStoreInstance.getAuthToken() || "";
};
