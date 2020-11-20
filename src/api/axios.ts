import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshAuthLogic } from "./refreshToken";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API || "",
});

createAuthRefreshInterceptor(instance, refreshAuthLogic);

export const Axios = instance;
