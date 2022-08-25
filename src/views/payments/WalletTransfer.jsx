//react
import { useEffect, useState } from "react";
//state
import { useRecoilState } from "recoil";
import userState from "../../recoil/userRecoil";
//router
import { Outlet, useNavigate } from "react-router-dom";
//api
import useGetUserInfo from "../../apis/profile/useGetUserInfo";
import useGetWalletBeneficiary from "../../apis/payments/wallettransfer/useGetWalletBeneficiary";
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
  HStack,
} from "@chakra-ui/react";
import BackButton from "../../components/BackButton";
import Alert from "../../components/Alert";
import NumberFormat from "react-number-format";
import Avatar from "react-avatar";
//assets
import naira from "../../assets/naira.svg";

const WalletTransfer = () => {
  let navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const { isUserSuccess, data } = useGetUserInfo();
  const { isSuccess: isSuccessBeneficiary, data: beneficiary } =
    useGetWalletBeneficiary();

  //beneficiary data
  const [walletBeneficiary, setWalletBeneficiary] = useState([]);
  const [fullWalletBeneficiaryList, setFullWalletBeneficiaryList] =
    useState([]);

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
    error: errorInitializeData,
    isError: isErrorInitialize,
  } = useSetInitializeWalletTransfer();

  useEffect(() => {
    if (isUserSuccess) {
      setUser(data.data.data);
    }

    if (detailsSuccess) {
      setReceipientName(walletDetails.data.data.name);
      setReceipientWalletAddress(walletDetails.data.data.wallet_address);
    }

    if (isSuccessBeneficiary) {
      setWalletBeneficiary(beneficiary.data.data.slice(0, 5));
      setFullWalletBeneficiaryList(beneficiary.data.data);
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
    isSuccessBeneficiary,
    beneficiary,
    setFullWalletBeneficiaryList,
    setWalletBeneficiary,
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
      {isErrorInitialize && (
        <Alert
          status="error"
          message={errorInitializeData.response.data.message}
        />
      )}
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

          {walletBeneficiary ? (
            <div className="beneficiary-container">
              <HStack
                spacing={2}
                alignItems="center"
                placeItems="center"
                className="beneficiary-header"
              >
                <svg
                  width="14"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  color="#d40000"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path>
                </svg>
                <p>Beneficiary</p>
              </HStack>

              <div className="beneficiaries">
                {walletBeneficiary.map((beneficial, index) => (
                  <div className="beneficiary" key={index}>
                    <Avatar
                      maxInitials={1}
                      name={beneficial.name}
                      size={40}
                      round={true}
                      onClick={() => {
                        setReceipientEmail(beneficial.email);
                        setReceipientWalletAddress(beneficial.wallet_to);
                        setReceipientName(beneficial.name);
                      }}
                    />
                    <p>
                      {utils.truncateText(beneficial.name, 21).toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>

              <HStack justifyContent="flex-end" className="see-more">
                <p
                  onClick={() => {
                    navigate("/payments/wallet/all-wallet-beneficiaries/");
                  }}
                >
                  More
                </p>
                <svg
                  width="14"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  color="#000"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path>
                </svg>
              </HStack>
            </div>
          ) : null}

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
          fullWalletBeneficiaryList,
          setReceipientEmail,
          setReceipientWalletAddress,
          setReceipientName,
        ]}
      />
    </div>
  );
};

export default WalletTransfer;
