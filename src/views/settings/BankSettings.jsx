//react
import { useState, useEffect } from "react";
//api
import useGetAllBanks from "../../apis/payments/banktransfer/useGetAllBanks";
import useSetBankSettings from "../../apis/settings/bank/useSetBankSettings";
import useGetBankSettings from "../../apis/settings/bank/useGetBankSettings";
//component
import { Outlet, useNavigate } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import BackButton from "../../components/BackButton";
import Alert from "../../components/Alert";

const BankSettings = () => {
  let navigate = useNavigate();
  const [allBanks, setAllBanks] = useState(null);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectBankCode, setSelectBankCode] = useState("");
  const [bankAcctName, setBankAcctName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  //apis
  const { isSuccess: isSuccessBanks, data: banks } = useGetAllBanks();
  const { isSuccess: isSuccessGetBankSettings, data: getBankSettings } =
    useGetBankSettings();

  const {
    mutate: setBankSettings,
    isSuccess: isSuccessBankSettings,
    isLoading: isLoadingBankSettings,
    isError: isErrorBankSettings,
    error: errorBankSettings,
  } = useSetBankSettings();

  useEffect(() => {
    if (isSuccessBanks) {
      setAllBanks(banks.data.data.banks);
    }
  }, [isSuccessBanks, banks]);

  const submitBankSettings = (pin) => {
    const value = {
      bankName: selectedBank,
      bankCode: selectBankCode,
      bankAcctName: bankAcctName,
      accountNumber: accountNumber,
      pin: pin,
    };
    setBankSettings(value);
  };

  return (
    <div className="bank-settings">
      <BackButton times="/settings" />
      <h1 className="page-name">Bank Settings</h1>
      <div className="wrapper">
        {isErrorBankSettings && (
          <Alert
            status="error"
            message={errorBankSettings.response.data.message}
          />
        )}

        {isSuccessBankSettings && (
          <Alert status="success" message={"Bank Updated Successfully"} />
        )}

        <main>
          <h1 className="header-text">Account Details</h1>
          <div className="account-details">
            <div className="bank">
              <h2>Bank name</h2>
              <p>
                {isSuccessGetBankSettings &&
                  getBankSettings.data.data[0].bank_name}
              </p>
            </div>
            <div className="account-name">
              <h2>Account name</h2>
              <p>
                {" "}
                {isSuccessGetBankSettings &&
                  getBankSettings.data.data[0].bank_acct_name}
              </p>
            </div>
            <div className="account-number">
              <h2>Account number</h2>
              <p>
                {" "}
                {isSuccessGetBankSettings &&
                  getBankSettings.data.data[0].bank_acct_no}
              </p>
            </div>
          </div>

          <h1 className="header-text">Change Account Details</h1>
          <form>
            <div className="inputs">
              <label htmlFor="bank-name">Bank Name</label>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <svg width="24" height="24" viewBox="0 0 43 43" fill="none">
                      <circle cx="21.5" cy="21.5" r="21.5" fill="#FF3A3A20" />
                      <path
                        d="M12 28H32V30H12V28ZM14 20H16V27H14V20ZM19 20H21V27H19V20ZM23 20H25V27H23V20ZM28 20H30V27H28V20ZM12 15L22 10L32 15V19H12V15ZM14 16.236V17H30V16.236L22 12.236L14 16.236ZM22 16C21.7348 16 21.4804 15.8946 21.2929 15.7071C21.1054 15.5196 21 15.2652 21 15C21 14.7348 21.1054 14.4804 21.2929 14.2929C21.4804 14.1054 21.7348 14 22 14C22.2652 14 22.5196 14.1054 22.7071 14.2929C22.8946 14.4804 23 14.7348 23 15C23 15.2652 22.8946 15.5196 22.7071 15.7071C22.5196 15.8946 22.2652 16 22 16Z"
                        fill="#d40000"
                      />
                    </svg>
                  }
                />
                <Input
                  type="text"
                  id="bank-name"
                  placeholder="Select Bank"
                  readOnly
                  defaultValue={selectedBank}
                  onClick={() => {
                    navigate("/settings/bank/bank-list");
                  }}
                />
                <InputRightElement
                  children={
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.17168 7.00023L0.22168 2.05023L1.63568 0.63623L7.99968 7.00023L1.63568 13.3642L0.22168 11.9502L5.17168 7.00023Z"
                        fill="#3A3A3A"
                      />
                    </svg>
                  }
                />
              </InputGroup>
            </div>

            <div className="inputs">
              <label htmlFor="account-number">Account Number</label>
              <Input
                id="account-number"
                type="number"
                placeholder="2229227625"
                size="lg"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="inputs">
              <label htmlFor="account-name">Account Name</label>
              <Input
                id="account-name"
                type="text"
                placeholder="Chukwudi Chike"
                size="lg"
                value={bankAcctName}
                onChange={(e) => setBankAcctName(e.target.value)}
              />
            </div>

            <div className="submit-button">
              <Button
                size="md"
                colorScheme="red"
                onClick={() => {
                  navigate("/settings/bank/pin");
                }}
                isLoading={isLoadingBankSettings}
              >
                Save Information
              </Button>
            </div>
          </form>
        </main>
      </div>
      <Outlet
        context={[
          allBanks,
          setSelectedBank,
          setSelectBankCode,
          submitBankSettings,
          {
            loading: isLoadingBankSettings,
            success: isSuccessBankSettings,
          },
        ]}
      />
    </div>
  );
};

export default BankSettings;

// TODO - setup pin input
