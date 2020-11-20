import { AuthStoreInstance } from "../modules/Auth/store/AuthenticationStore";
import axios from "axios";
import to from "await-to-js";

interface FirebaseRefreshI {
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

export const refreshAuthLogic = async (failedRequest: any) => {
  const [error, response] = await to(
    axios.post<FirebaseRefreshI>(
      `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
      {
        grant_type: "refresh_token",
        refresh_token: AuthStoreInstance.getRefreshToken(),
      }
    )
  );

  if (error) {
    throw error;
  }

  if (!response) {
    throw new Error("Token could not be refreshed");
  }

  AuthStoreInstance.setToken(response.data?.id_token);

  failedRequest.response.config.headers["Authorization"] =
    "Bearer " + response.data?.id_token;
};
