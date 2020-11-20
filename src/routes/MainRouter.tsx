import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { observer, useObserver } from "mobx-react";

import { AuthRoutes } from "./AuthRouter";
import { AuthenticatedRoute } from "./helpers/AuthenticatedRoute";
import { Loading } from "../components/Loading";
import { Login } from "../modules/Auth/Login";
import { ROUTE } from "./constants";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "../modules/Auth/store/AuthenticationStore";
import { useFirebaseUser } from "../hooks/useFirebaseAuth";
import { useUserProfile } from "../hooks/useUserProfile";

const useStores = () => {
  const { AuthStore } = useAuthStore();
  return useObserver(() => ({
    user: AuthStore.user,
  }));
};

export const MainRouter = observer(() => {
  const { initializing } = useFirebaseUser();
  const { user } = useStores();

  useUserProfile(user);

  if (initializing || (user && !user?.profile?.id)) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Switch>
        <Route exact path={ROUTE.LOGIN} component={Login} />
        <AuthenticatedRoute path={ROUTE.HOME} component={AuthRoutes} />
      </Switch>

      <ToastContainer />
    </Fragment>
  );
});
