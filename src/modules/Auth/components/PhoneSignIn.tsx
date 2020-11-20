import { auth, firebase } from "../../../api/firebase";

import { ROUTE } from "../../../routes/constants";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: ROUTE.PROFILE,
  signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
  tosUrl: "https://www.naturalcycles.com/other/legal/terms/",
  privacyPolicyUrl: "https://www.naturalcycles.com/other/legal/privacy/",
  callbacks: {
    //Avoid redirects
    signInSuccessWithAuthResult: () => false,
  },
};

export const PhoneSignIn = () => {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
};
