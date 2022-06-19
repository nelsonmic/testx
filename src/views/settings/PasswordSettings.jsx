import {
  Input,
  //   InputGroup,
  //   InputRightElement,
  //   InputLeftElement,
  Button,
} from "@chakra-ui/react";
import BackButton from "../../components/BackButton";
// import Alert from "../../components/Alert";

const PasswordSettings = () => {
  return (
    <div className="password-settings">
      <BackButton />
      <h1 className="page-name">Password Settings</h1>
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
          <h1 className="header-text">Change Password</h1>
          <p>Change your Xtrapay password below</p>
          <form>
            <div className="inputs">
              <label htmlFor="old-password">Old password</label>
              <Input
                id="old-password"
                type="text"
                size="lg"
                // value={accountNumber}
                // onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="inputs">
              <label htmlFor="new-password">New password</label>
              <Input
                id="new-password"
                type="text"
                size="lg"
                // value={accountNumber}
                // onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="inputs">
              <label htmlFor="retype-new-password">Retype New password</label>
              <Input
                id="retype-new-password"
                type="text"
                size="lg"
                // value={accountNumber}
                // onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="submit-button">
              <Button
                size="md"
                colorScheme="red"
                // onClick={submitBankSettings}
                // isLoading={isLoadingBankSettings}
              >
                Update Password
              </Button>
            </div>
          </form>
        </main>
      </div>
      {/* <Outlet context={[allBanks, setSelectedBank, setSelectBankCode]} /> */}
    </div>
  );
};

export default PasswordSettings;
