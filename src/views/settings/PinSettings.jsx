import { PinInput, PinInputField, Button } from "@chakra-ui/react";
import BackButton from "../../components/BackButton";

const PinSettings = () => {
  return (
    <div className="pin-settings">
      <BackButton />
      <h1 className="page-name">Pin Settings</h1>
      <div className="wrapper">
        {/* {isErrorBankSettings && (
        <Alert
          status="error"
          message={errorBankSettings.response.data.message}
        />
      )}

      {isSuccessBankSettings && (
        <Alert status="success" message={"Bank Updated Successfully"} />
      )} */}

        <main>
          <h1 className="header-text">I know my pin</h1>
          <p>Change your transaction pin below</p>
          <form>
            <div className="pin-inputs">
              <p>Current pin</p>
              <div className="inputs">
                <PinInput
                  mask
                  size="lg"
                  // value={pin}
                  // onChange={handleChange}
                  // onComplete={handleComplete}
                  className="pin-input-container"
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </div>
            </div>

            <div className="submit-button">
              <Button
                size="md"
                colorScheme="red"
                // onClick={submitBankSettings}
                // isLoading={isLoadingBankSettings}
              >
                Next
              </Button>
            </div>
          </form>

          <div className="request">
            <h1 className="header-text">I don't know my pin</h1>
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
          </div>
        </main>
      </div>
      {/* <Outlet context={[allBanks, setSelectedBank, setSelectBankCode]} /> */}
    </div>
  );
};

export default PinSettings;
