//react
import { useState } from "react";

//router
import { useOutletContext } from "react-router-dom";

//api
import useSetProcessAllTransactions from "../apis/useSetProcessAllTransactions";

//components
import BackButton from "../components/BackButton";
import Alert from "../components/Alert";
import LoadingScreen from "../components/LoadingScreen";
import SuccessScreen from "../components/SuccessScreen";
import { PinInput, PinInputField } from "@chakra-ui/react";

//assets
import naira from "../assets/naira.svg";

const ConfirmAllTransactions = ({ transactionType }) => {
  const {
    mutate: setProcessAllTransactions,
    isSuccess: isProcessSuccess,
    isError: isProcessError,
    error: processError,
    isLoading: processLoading,
  } = useSetProcessAllTransactions();

  const [
    //eslint-disable-next-line
    allBanks,
    //eslint-disable-next-line
    setSelectedBank,
    //eslint-disable-next-line
    setSelectBankCode,
    transactionHash,
    //eslint-disable-next-line
    accountNumber,
    amountWithComma,
    selectedBank,
    receipientName,
    description,
  ] = useOutletContext();

  console.log(useOutletContext());

  const [pin, setPin] = useState("");
  const handleChange = (e) => {
    setPin(e);
  };
  const handleComplete = (value) => {
    const values = { transactionHash, value };
    setProcessAllTransactions(values);
  };
  return (
    <div className="confirm-all-transactions">
      <BackButton />
      <h1 className="page-name">Confirm Transaction</h1>
      {processLoading ? <LoadingScreen /> : null}
      {isProcessError ? (
        <Alert status="error" message={processError.response.data.message} />
      ) : null}
      {isProcessSuccess ? (
        <SuccessScreen name={receipientName} amount={amountWithComma} />
      ) : null}

      <div className="wrapper">
        <main>
          <div className="info">
            <p>Receipient:</p>
            <h2>{receipientName}</h2>
            <p>Amount:</p>
            <h2>
              <img src={naira} alt="naira" />
              {amountWithComma}
            </h2>
          </div>

          <div className="desc">
            <p>
              <span>Description:</span>
              {description}
            </p>
            {/* <p>
              <span>Fee:</span>
              {fee}
            </p> */}
            <p>
              <span>{transactionType}:</span>
              <svg width="24" height="24" viewBox="0 0 43 43" fill="none">
                <circle cx="21.5" cy="21.5" r="21.5" fill="#FF3A3A20" />
                <path
                  d="M12 28H32V30H12V28ZM14 20H16V27H14V20ZM19 20H21V27H19V20ZM23 20H25V27H23V20ZM28 20H30V27H28V20ZM12 15L22 10L32 15V19H12V15ZM14 16.236V17H30V16.236L22 12.236L14 16.236ZM22 16C21.7348 16 21.4804 15.8946 21.2929 15.7071C21.1054 15.5196 21 15.2652 21 15C21 14.7348 21.1054 14.4804 21.2929 14.2929C21.4804 14.1054 21.7348 14 22 14C22.2652 14 22.5196 14.1054 22.7071 14.2929C22.8946 14.4804 23 14.7348 23 15C23 15.2652 22.8946 15.5196 22.7071 15.7071C22.5196 15.8946 22.2652 16 22 16Z"
                  fill="#d40000"
                />
              </svg>
              {selectedBank}
            </p>
          </div>

          <div className="pin-inputs">
            <p>Enter your 4 digit transaction pin</p>
            <div className="inputs">
              <PinInput
                mask
                size="lg"
                value={pin}
                onChange={handleChange}
                onComplete={handleComplete}
                className="pin-input-container"
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConfirmAllTransactions;
