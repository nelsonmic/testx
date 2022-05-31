//react
import { useEffect, useState } from "react";
//state
import { useRecoilState } from "recoil";
import userState from "../../recoil/userRecoil";
//router
import { Outlet, useNavigate } from "react-router-dom";
//api
import useGetUserInfo from "../../apis/profile/useGetUserInfo";
import useGetWalletDetails from "../../apis/payments/wallettransfer/useGetWalletDetails";
import useSetInitializeWalletTransfer from "../../apis/payments/wallettransfer/useSetInitializeWalletTransfer";
//utils
import * as utils from "../../utils";
//components
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import BackButton from "../../components/BackButton";
import Alert from "../../components/Alert";
import NumberFormat from "react-number-format";
//assets
import naira from "../../assets/naira.svg";

const WalletTransfer = () => {
  let navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const { isUserSuccess, data } = useGetUserInfo();

  //all user enetered data
  const [receipientEmail, setReceipientEmail] = useState("");
  const [receipientName, setReceipientName] = useState("");
  const [receipientWalletAddress, setReceipientWalletAddress] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [amountWithComma, setAmountWithComma] = useState("");

  //error state
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //transaction hash key gotten after successful transaction
  const [walletTransactionHash, setWalletTransactionHash] = useState("");

  //get receipient wallet details
  const {
    isLoading: isLoadingWalletDetails,
    isSuccess: detailsSuccess,
    data: walletDetails,
    isError: isErrorDetails,
    error: errorDetails,
    refetch: refetchWalletDetails,
  } = useGetWalletDetails(receipientEmail);

  //initialize wallet transfer
  const {
    mutate: setInitializeWalletTransfer,
    isLoading: isLoadingInitializeWalletTransfer,
    isSuccess: initializeSuccess,
    data: initializeData,
  } = useSetInitializeWalletTransfer();

  useEffect(() => {
    if (isUserSuccess) {
      setUser(data.data.data);
    }

    if (detailsSuccess) {
      setReceipientName(walletDetails.data.data.name);
      setReceipientWalletAddress(walletDetails.data.data.wallet_address);
    }

    if (isErrorDetails) {
      setReceipientName(errorDetails.response.data.message);
    }
    if (initializeSuccess) {
      setWalletTransactionHash(initializeData.data.data.hash);
      navigate("/payments/wallet/confirm-wallet-transactions");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isUserSuccess,
    data,
    user,
    setUser,
    detailsSuccess,
    walletDetails,
    isErrorDetails,
    errorDetails,
    initializeSuccess,
    initializeData,
  ]);

  //handle form submission
  const submitPaymentInfo = () => {
    if (
      receipientEmail === "" ||
      amount === "" ||
      description === "" ||
      receipientName === "" ||
      !utils.validateEmail(receipientEmail.trim())
    ) {
      setError(true);
      setErrorMessage("Please fill all fields");
    } else {
      const values = {
        receipientWalletAddress,
        description,
        amount,
      };
      if (isLoadingWalletDetails === false) {
        setInitializeWalletTransfer(values);
      }
    }
  };

  return (
    <div className="wallet-transfer">
      <BackButton />
      <h1 className="page-name">Wallet Transfer</h1>
      {error && <Alert status="error" message={errorMessage} />}
      <div className="wrapper">
        <main>
          <div className="header">
            <p>Balance:</p>
            <h2 className="account-balance">
              <img src={naira} alt="naira" />
              {user
                ? utils.numbersWithCommas(utils.truncateDecimals(user.balance))
                : "0"}
            </h2>
          </div>

          <form className="Wallet-transfer-form">
            <div className="inputs">
              <label htmlFor="wallet-amount">Amount</label>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<p style={{ fontSize: "14px" }}>N</p>}
                />
                <NumberFormat
                  className="chakra-input css-1lw1oo1"
                  id="amount"
                  thousandSeparator={true}
                  value={amount}
                  placeholder="5,000"
                  isNumericString={true}
                  onValueChange={(value) => {
                    setAmount(value.floatValue);
                    setAmountWithComma(value.formattedValue);
                  }}
                />
              </InputGroup>
            </div>

            <div className="inputs">
              <label htmlFor="wallet-email">Email Address</label>
              <Input
                id="wallet-email"
                type="email"
                placeholder="receiveremail@example.com"
                size="lg"
                value={receipientEmail}
                onChange={(e) => setReceipientEmail(e.target.value)}
                onBlur={() => refetchWalletDetails(receipientEmail)}
              />
            </div>

            <div className="inputs">
              <label htmlFor="wallet-description">Description</label>
              <Input
                id="wallet-description"
                type="text"
                placeholder="School Fees"
                size="lg"
                maxLength={50}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="inputs">
              <label htmlFor="wallet-receipient">Receipient</label>

              <InputGroup size="lg">
                <InputRightElement
                  children={
                    isLoadingWalletDetails ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 57 57"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        color="#d4000080"
                      >
                        <g transform="translate(1 1)" fillRule="evenodd">
                          <circle cx="5" cy="50" r="5">
                            <animate
                              attributeName="cy"
                              begin="0s"
                              dur="2.2s"
                              values="50;5;50;50"
                              calcMode="linear"
                              repeatCount="indefinite"
                            ></animate>
                            <animate
                              attributeName="cx"
                              begin="0s"
                              dur="2.2s"
                              values="5;27;49;5"
                              calcMode="linear"
                              repeatCount="indefinite"
                            ></animate>
                          </circle>
                          <circle cx="27" cy="5" r="5">
                            <animate
                              attributeName="cy"
                              begin="0s"
                              dur="2.2s"
                              from="5"
                              to="5"
                              values="5;50;50;5"
                              calcMode="linear"
                              repeatCount="indefinite"
                            ></animate>
                            <animate
                              attributeName="cx"
                              begin="0s"
                              dur="2.2s"
                              from="27"
                              to="27"
                              values="27;49;5;27"
                              calcMode="linear"
                              repeatCount="indefinite"
                            ></animate>
                          </circle>
                          <circle cx="49" cy="50" r="5">
                            <animate
                              attributeName="cy"
                              begin="0s"
                              dur="2.2s"
                              values="50;50;5;50"
                              calcMode="linear"
                              repeatCount="indefinite"
                            ></animate>
                            <animate
                              attributeName="cx"
                              from="49"
                              to="49"
                              begin="0s"
                              dur="2.2s"
                              values="49;5;27;49"
                              calcMode="linear"
                              repeatCount="indefinite"
                            ></animate>
                          </circle>
                        </g>
                      </svg>
                    ) : null
                  }
                />
                <Input
                  id="wallet-receipient"
                  type="text"
                  placeholder="Chukwudi Chike"
                  readOnly
                  defaultValue={receipientName}
                />
              </InputGroup>
            </div>

            <div className="submit-button">
              <Button
                size="md"
                colorScheme="red"
                onClick={submitPaymentInfo}
                isLoading={isLoadingInitializeWalletTransfer ? true : false}
              >
                Proceed
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
          walletTransactionHash,
          receipientEmail,
          amountWithComma,
          receipientWalletAddress,
          receipientName,
          description,
        ]}
      />
    </div>
  );
};

export default WalletTransfer;
