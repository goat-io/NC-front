import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { observer, useObserver } from "mobx-react";

import { ROUTE } from "../constants";
import { useAuthStore } from "../../modules/Auth/store/AuthenticationStore";

interface AuthRouteParams {
  component: Component;
  rest: any;
}

const useStores = () => {
  const Auth = useAuthStore();
  return useObserver(() => ({
    user: Auth.AuthStore.user,
  }));
};

const AuthMiddleware = ({ component, rest }: AuthRouteParams) => {
  const { user } = useStores();

  if (!user) {
    return <Redirect to={ROUTE.LOGIN} />;
  }
  return <Route {...rest} component={component} />;
};

export const AuthenticatedRoute = observer(({ component, ...rest }: any) => {
  return <AuthMiddleware component={component} rest={rest} />;
});
