import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import LaddaButton, { EXPAND_RIGHT } from "react-ladda";
import React, { Fragment, useState } from "react";
import { observer, useObserver } from "mobx-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfilePicture } from "./components/ProfilePicture";
import { ProfileTitle } from "./components/ProfileTitle";
import { ProfileTypeOmitId } from "../Auth/store/types/Profile";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { notifyError } from "../../components/notifications/error";
import { notifySuccess } from "../../components/notifications/success";
import to from "await-to-js";
import { useAuthStore } from "../Auth/store/AuthenticationStore";
import { useEmailValidation } from "./hooks/useEmailValidation";
import { useNameValidation } from "./hooks/useNameValidation";

const useStoreData = () => {
  const { AuthStore } = useAuthStore();
  return useObserver(() => ({
    userProfile: AuthStore.user?.profile,
    setProfile: AuthStore.setProfile,
  }));
};

export const ProfileEdit = observer(() => {
  const { userProfile, setProfile } = useStoreData();
  const [loading, setLoading] = useState(false);

  const profile = {
    name: userProfile?.name || "",
    email: userProfile?.email || "",
  };
  const [userProfileInput, setUserProfileInput] = useState<ProfileTypeOmitId>(
    profile
  );

  const [edit, setEdit] = useState(
    !!(profile.name === "" && profile.email === "")
  );

  const { error } = useNameValidation(userProfileInput.name);
  const { emailError } = useEmailValidation(userProfileInput.email);
  const inputHasChanged =
    profile.name !== userProfileInput.name ||
    profile.email !== userProfileInput.email;

  const handleCancel = () => {
    setUserProfileInput(profile);
    setEdit(false);
  };

  const handleSave = async () => {
    setLoading(true);
    const [saveError] = await to(setProfile(userProfileInput));

    if (saveError) {
      setLoading(false);
      notifyError(saveError.message);
      return;
    }

    notifySuccess("Your profile was saved!");
    setLoading(false);
    setEdit(false);
  };

  return (
    <Fragment>
      <ProfileTitle />
      <Container fluid>
        <Card className="main-card mb-3 w-50">
          <CardHeader>Your profile</CardHeader>
          <CardBody>
            <Form>
              <div style={{ display: "flex" }}>
                <ProfilePicture />
              </div>
              <FormGroup row>
                <Label for="firstName" sm={3}>
                  Name
                </Label>
                <Col sm={9}>
                  <Input
                    invalid={inputHasChanged && !!error}
                    valid={inputHasChanged && !error}
                    disabled={!edit}
                    value={userProfileInput.name}
                    onChange={(e) =>
                      setUserProfileInput({
                        ...userProfileInput,
                        name: e.target.value,
                      })
                    }
                  />
                  <FormFeedback valid={false}>{error}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="lastName" sm={3}>
                  Email
                </Label>
                <Col sm={9}>
                  <Input
                    invalid={inputHasChanged && !!emailError}
                    valid={inputHasChanged && !emailError}
                    disabled={!edit}
                    value={userProfileInput.email}
                    onChange={(e) =>
                      setUserProfileInput({
                        ...userProfileInput,
                        email: e.target.value,
                      })
                    }
                  />
                  <FormFeedback valid={false}>{emailError}</FormFeedback>
                </Col>
              </FormGroup>
            </Form>
            <div className="float-right">
              {edit ? (
                <>
                  <Button color="secondary" onClick={handleCancel}>
                    <span>Cancel</span>
                  </Button>
                  <LaddaButton
                    className="ml-2 btn btn-primary"
                    loading={loading}
                    onClick={handleSave}
                    data-style={EXPAND_RIGHT}
                    disabled={!!error || !!emailError || !inputHasChanged}
                  >
                    Save
                  </LaddaButton>
                </>
              ) : (
                <Button color="warning" onClick={() => setEdit(true)}>
                  <FontAwesomeIcon className="mr-2" icon={faPen} />
                  <span>Edit Profile</span>
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
});
