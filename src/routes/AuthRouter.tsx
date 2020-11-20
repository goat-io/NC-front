import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { AppSidebar } from "../layout/Sidebar/Sidebar";
import { Header } from "../layout/Header/Header";
import { Loading } from "../components/Loading";
import { ProfileEdit } from "../modules/Profile/edit";
import { ROUTE } from "./constants";
import { observer } from "mobx-react";

/**
 * All routes that require authentication
 */
export const AuthRoutes = observer(() => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <Switch>
                <Route exact path={ROUTE.HOME} component={ProfileEdit} />
                <Route exact path={ROUTE.PROFILE} component={ProfileEdit} />
              </Switch>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
});
