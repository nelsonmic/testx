//react
import { useEffect, useState } from "react";
//state
import { useRecoilState } from "recoil";
import userState from "../../recoil/userRecoil";
//router
import { Outlet, useNavigate } from "react-router-dom";
//api
import useGetUserInfo from "../../apis/profile/useGetUserInfo";
import useGetBankBeneficiary from "../../apis/payments/banktransfer/useGetBankBeneficiary";
import useGetAllBanks from "../../apis/payments/banktransfer/useGetAllBanks";
import useGetBankDetails from "../../apis/payments/banktransfer/useGetBankDetails";
import useSetInitializeBankTransfer from "../../apis/payments/banktransfer/useSetInitializeBankTransfer";
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
import NumberFormat from "react-number-format";
import Alert from "../../components/Alert";
import Avatar from "react-avatar";
//assets
import naira from "../../assets/naira.svg";

const BankTransfer = () => {
  let navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [allBanks, setAllBanks] = useState(null);
  const [bankBeneficiary, setBankBeneficiary] = useState(null);
  const [fullBeneficiaryList, setFullBeneficiaryList] = useState(null);
  const { isSuccess: isSuccessInfo, data: info } = useGetUserInfo();
  const { isSuccess: isSuccessBanks, data: banks } = useGetAllBanks();
  const { isSuccess: isSuccessBeneficiary, data: beneficiary } =
    useGetBankBeneficiary();

  //all selected info
  const [selectedBank, setSelectedBank] = useState("");
  const [selectBankCode, setSelectBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [staleAccountNumber, setStaleAccountNumber] = useState("");
  const [receipientName, setReceipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [amountWithComma, setAmountWithComma] = useState("");
  const [description, setDescription] = useState("");

  //error state
  const [error, setError] = useState(false);

  //transaction hash key gotten after successful transaction
  const [transactionHash, setTransactionHash] = useState("");

  //get receipient bank details
  const {
    isLoading: isLoadingBankDetails,
    isSuccess: detailsSuccess,
    data: bankDetails,
    isError: isErrorDetails,
    error: errorDetails,
    refetch: refetchBankDetails,
  } = useGetBankDetails(selectBankCode, accountNumber);

  //initialize bank transfer
  const {
    mutate: setInitializeBankTransfer,
    isLoading: isLoadingInitialize,
    isSuccess: initializeSuccess,
    data: initializeData,
    error: errorInitializeData,
    isError: isErrorInitialize,
  } = useSetInitializeBankTransfer();

  useEffect(() => {
    if (isSuccessInfo) {
      setUser(info.data.data);
    }

    if (isSuccessBanks) {
      setAllBanks(banks.data.data.banks);
    }

    if (isSuccessBeneficiary) {
      setBankBeneficiary(beneficiary.data.data.slice(0, 5));
      setFullBeneficiaryList(beneficiary.data.data);
    }

    //call bank details
    if (staleAccountNumber.length === 10) {
      refetchBankDetails();
      setStaleAccountNumber("xxx");
    }

    if (detailsSuccess) setReceipientName(bankDetails.data.data.name);
    if (isErrorDetails) setReceipientName(errorDetails.response.data.message);
    if (initializeSuccess) {
      setTransactionHash(initializeData.data.data.hash);
      navigate("/payments/bank/confirm-bank-transactions/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSuccessInfo,
    info,
    user,
    setUser,
    isSuccessBanks,
    banks,
    setAllBanks,
    allBanks,
    staleAccountNumber,
    refetchBankDetails,
    detailsSuccess,
    bankDetails,
    initializeSuccess,
    initializeData,
    isErrorDetails,
    errorDetails,
    isSuccessBeneficiary,
    beneficiary,
  ]);

  //handle form submission
  const submitPaymentInfo = () => {
    if (
      selectedBank === "" ||
      accountNumber === "" ||
      amount === "" ||
      description === "" ||
      selectBankCode === "" ||
      receipientName === "" ||
      amount > user.balance
    ) {
      setError(true);
    } else {
      const values = {
        selectBankCode,
        selectedBank,
        accountNumber,
        receipientName,
        description,
        amount,
      };
      setInitializeBankTransfer(values);
    }
  };

  return (
    <div className="bank-transfer">
      <BackButton />
      <h1 className="page-name">Bank Transfer</h1>
      {error && <Alert status="error" message="Please fill all fields" />}
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
          {bankBeneficiary ? (
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
                {bankBeneficiary.map((beneficial, index) => (
                  <div className="beneficiary" key={index}>
                    <Avatar
                      maxInitials={1}
                      name={beneficial.account_name}
                      size={40}
                      round={true}
                      onClick={() => {
                        setSelectedBank(beneficial.bank_name);
                        setSelectBankCode(beneficial.bank_code);
                        setAccountNumber(beneficial.account_number);
                        setReceipientName(beneficial.account_name);
                      }}
                    />
                    <p>
                      {utils
                        .truncateText(beneficial.account_name, 21)
                        .toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>

              <HStack justifyContent="flex-end" className="see-more">
                <p
                  onClick={() => {
                    navigate("/payments/bank/all-bank-beneficiaries/");
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

          <form className="bank-transfer-form">
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
                    navigate("/payments/bank/bank-list");
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
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  setStaleAccountNumber(e.target.value);
                }}
              />
            </div>

            <div className="inputs">
              <label htmlFor="receipient">Receipient</label>
              <InputGroup size="lg">
                <InputRightElement
                  children={
                    isLoadingBankDetails ? (
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
                  id="receipient"
                  type="text"
                  placeholder="Chukwudi Chike"
                  defaultValue={receipientName}
                  readOnly
                />
              </InputGroup>
            </div>

            <div className="inputs">
              <label htmlFor="amount">Amount</label>
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
              <label htmlFor="description">Description</label>
              <Input
                id="description"
                type="text"
                placeholder="School Fees"
                size="lg"
                maxLength={50}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>

            <div className="submit-button">
              <Button
                size="md"
                colorScheme="red"
                onClick={submitPaymentInfo}
                isLoading={isLoadingInitialize ? true : false}
              >
                Proceed
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
          transactionHash,
          accountNumber,
          amountWithComma,
          selectedBank,
          receipientName,
          description,
          fullBeneficiaryList,
          setAccountNumber,
          setReceipientName,
        ]}
      />
    </div>
  );
};

export default BankTransfer;
