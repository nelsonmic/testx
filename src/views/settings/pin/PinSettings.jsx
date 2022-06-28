//react
import { useState } from "react";

//api
import useSetPinSettings from "../../../apis/settings/pin/useSetPinSettings";

//components
import { PinInput, PinInputField, Button } from "@chakra-ui/react";
import BackButton from "../../../components/BackButton";
import Alert from "../../../components/Alert";
import AnimatedComponent from "../../../components/AnimatedComponent";

const PinSettings = () => {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  //apis

  const {
    mutate: setPinSettings,
    isSuccess: isSuccessPinSettings,
    isLoading: isLoadingPinSettings,
    isError: isErrorPinSettings,
    error: errorPinSettings,
  } = useSetPinSettings();

  const submitPinSettings = () => {
    const value = {
      oldPin,
      newPin,
      confirmPin,
    };
    setPinSettings(value);
  };
  return (
    <div className="pin-settings">
      <BackButton />
      <h1 className="page-name">Pin Settings</h1>
      <div className="wrapper">
        {isErrorPinSettings && (
          <Alert
            status="error"
            message={errorPinSettings.response.data.message}
          />
        )}

        {isSuccessPinSettings && (
          <Alert status="success" message={"Pin Updated Successfully"} />
        )}
        <main>
          <h1 className="header-text">Change Pin</h1>

          <form>
            <div className="pin-inputs">
              <p>Current pin</p>
              <div className="inputs">
                <PinInput
                  mask
                  size="lg"
                  value={oldPin}
                  onChange={setOldPin}
                  className="pin-input-container"
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </div>
              {oldPin.length === 4 && (
                <AnimatedComponent>
                  <p>New pin</p>
                  <div className="inputs">
                    <PinInput
                      mask
                      size="lg"
                      value={newPin}
                      onChange={setNewPin}
                      className="pin-input-container"
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </div>
                </AnimatedComponent>
              )}
              {newPin.length === 4 && (
                <AnimatedComponent>
                  <p>Confirm pin</p>
                  <div className="inputs">
                    <PinInput
                      mask
                      size="lg"
                      value={confirmPin}
                      onChange={setConfirmPin}
                      className="pin-input-container"
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </div>
                </AnimatedComponent>
              )}
            </div>

            <div className="submit-button">
              <Button
                size="md"
                colorScheme="red"
                onClick={() => {
                  submitPinSettings();
                }}
                isLoading={isLoadingPinSettings}
              >
                Next
              </Button>
            </div>
          </form>

          {/* <div className="request">
            <h1 className="header-text">Reset Pin</h1>
            <p>Send a request to customer care to reset your pin</p>
            <div className="submit-button">
              <Button
                size="md"
                colorScheme="red"
                // onClick={submitBankSettings}
                // isLoading={isLoadingBankSettings}
              >
                Send request
              </Button>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default PinSettings;
