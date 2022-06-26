//react
import { useState } from "react";
//route
import { Outlet, useNavigate } from "react-router-dom";
//api
import useSetPasswordSettings from "../../apis/settings/password/useSetPasswordSettings";
import {
  Input,
  //   InputGroup,
  //   InputRightElement,
  //   InputLeftElement,
  Button,
} from "@chakra-ui/react";
import BackButton from "../../components/BackButton";
import Alert from "../../components/Alert";

const PasswordSettings = () => {
  const navigate = useNavigate();
  //states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //apis

  const {
    mutate: setPasswordSettings,
    isSuccess: isSuccessPasswordSettings,
    isLoading: isLoadingPasswordSettings,
    isError: isErrorPasswordSettings,
    error: errorPasswordSettings,
  } = useSetPasswordSettings();

  const submitPasswordSettings = (pin) => {
    const value = {
      oldPassword,
      newPassword,
      confirmPassword,
      pin: pin,
    };
    setPasswordSettings(value);
  };
  return (
    <div className="password-settings">
      <BackButton times="/settings" />
      <h1 className="page-name">Password Settings</h1>
      <div className="wrapper">
        {isErrorPasswordSettings && (
          <Alert
            status="error"
            message={errorPasswordSettings.response.data.message}
          />
        )}

        {isSuccessPasswordSettings && (
          <Alert status="success" message={"Password Updated Successfully"} />
        )}

        <main>
          <h1 className="header-text">Change Password</h1>
          <p>Change your Xtrapay password below</p>
          <form>
            <div className="inputs">
              <label htmlFor="old-password">Old password</label>
              <Input
                id="old-password"
                type="text"
                size="lg"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="inputs">
              <label htmlFor="new-password">New password</label>
              <Input
                id="new-password"
                type="text"
                size="lg"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="inputs">
              <label htmlFor="retype-new-password">Retype New password</label>
              <Input
                id="retype-new-password"
                type="text"
                size="lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="submit-button">
              <Button
                size="md"
                colorScheme="red"
                onClick={() => {
                  navigate("/settings/password/pin");
                }}
              >
                Update Password
              </Button>
            </div>
          </form>
        </main>
      </div>
      <Outlet
        context={[
          "",
          "",
          "",
          submitPasswordSettings,
          {
            loading: isLoadingPasswordSettings,
            success: isSuccessPasswordSettings,
          },
        ]}
      />
    </div>
  );
};

export default PasswordSettings;

//TODO: Add validation for password input fields
