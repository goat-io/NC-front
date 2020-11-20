import React, { Fragment } from "react";

import { Col } from "reactstrap";
import { LoginForm } from "./components/LoginForm";
import { ROUTE } from "../../routes/constants";
import { Redirect } from "react-router-dom";
import { useAuthStore } from "./store/AuthenticationStore";
import { useObserver } from "mobx-react";

const useStores = () => {
  const Auth = useAuthStore();
  return useObserver(() => ({
    user: Auth.AuthStore.user,
  }));
};

export const Login = () => {
  const { user } = useStores();

  if (user) {
    return <Redirect to={ROUTE.PROFILE} />;
  }

  return (
    <Fragment>
      <div className="h-100 bg-plum-plate bg-animation">
        <div className="d-flex h-100 justify-content-center align-items-center">
          <Col md="8" className="mx-auto app-login-box">
            <div className="app-logo-inverse mx-auto mb-3" />
            <LoginForm />
          </Col>
        </div>
      </div>
    </Fragment>
  );
};
