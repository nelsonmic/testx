//react
import { useEffect, useState } from "react";
//state
import { useRecoilState } from "recoil";
import userState from "../../../recoil/userRecoil";
//api
import useGetUserInfo from "../../../apis/profile/useGetUserInfo";
import useGetElectricityBillers from "../../../apis/payments/billpayments/electricity/useGetElectricityBiller";
import useGetCustomerData from "../../../apis/payments/billpayments/electricity/useGetCustomerData";
import useSetInitializeElectricity from "../../../apis/payments/billpayments/electricity/useSetInitializeElectricity";
//router
import { Outlet, useNavigate } from "react-router-dom";
//Components
import Alert from "../../../components/Alert";
import BackButton from "../../../components/BackButton";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import NumberFormat from "react-number-format";
//utils
import * as utils from "../../../utils";
//assets
import naira from "../../../assets/naira.svg";

const Electricity = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const { isSuccess: isSuccessInfo, data: info } = useGetUserInfo();

  //electricity billers
  const [allElectricityBillers, setAllElectricityBillers] = useState(null);

  //all transaction states
  const [amount, setAmount] = useState("");
  const [amountWithComma, setAmountWithComma] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [description, setDescription] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentCode, setPaymentCode] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [staleMeterNumber, setStaleMeterNumber] = useState("");
  const [receipient, setReceipient] = useState("");

  //transaction hash
  const [transactionHash, setTransactionHash] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //api
  const {
    isSuccess: isSuccessBillers,
    data: electricityBillers,
    isLoading: loadingElectricityBillers,
  } = useGetElectricityBillers();

  //get customer data
  const {
    mutate: getCustomerData,
    isLoading: isLoadingData,
    isSuccess: customerDataSuccess,
    data: customerData,
    isError: customerDataError,
    error: customerDataErrorMessage,
  } = useGetCustomerData();

  //initialize electricity purchase
  const {
    mutate: setInitializeElectricity,
    isLoading: isLoadingInitialize,
    isSuccess: initializeSuccess,
    data: initializeData,
    error: errorInitializeData,
    isError: isErrorInitialize,
  } = useSetInitializeElectricity();

  useEffect(() => {
    if (isSuccessInfo) {
      setUser(info.data.data);
    }

    if (isSuccessBillers) {
      setAllElectricityBillers(electricityBillers.data.data);
    }

    //call customer data
    if (staleMeterNumber.length >= 10) {
      getCustomerData({ paymentCode, meterNumber });
      setStaleMeterNumber("");
    }

    if (customerDataSuccess) {
      setReceipient(
        `${customerData.data.customer.name}| ${customerData.data.customer.address}`
      );
      setCustomerName(customerData.data.customer.name);
      setCustomerAddress(customerData.data.customer.address);
      setMinAmount(customerData.data.customer.minimumAmount);
      setAccessToken(customerData.data.access_token);
    }
    if (customerDataError)
      setReceipient(customerDataErrorMessage.response.data.message);

    if (initializeSuccess) {
      setTransactionHash(initializeData.data.data.hash);
      navigate(
        "/payments/billpayments/electricity/confirm-electricity-transactions"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSuccessInfo,
    info,
    user,
    setUser,
    isSuccessBillers,
    electricityBillers,
    setAllElectricityBillers,
    paymentCode,
    meterNumber,
    staleMeterNumber,
    getCustomerData,
    customerDataSuccess,
    customerData,
    customerDataError,
    customerDataErrorMessage,
    initializeSuccess,
    initializeData,
  ]);

  const handleSubmit = () => {
    const data = {
      amount: amount.toString(),
      meterNumber,
      paymentCode,
      accessToken,
      customerName,
      customerAddress,
    };
    if (
      amount !== "" ||
      meterNumber !== "" ||
      paymentCode !== "" ||
      accessToken !== "" ||
      customerName !== "" ||
      customerAddress !== ""
    ) {
      if (amount >= minAmount) {
        setInitializeElectricity(data);
      } else {
        setError(true);
        setErrorMessage(`Amount is less than minimum ${minAmount} amount`);
      }
    } else {
      setError(true);
      setErrorMessage("All fields required");
    }
  };
  return (
    <div className="electricity-purchase">
      <BackButton />
      <h1 className="page-name">Buy Electricity</h1>
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

          <form className="electricity-purchase-form">
            <div className="inputs">
              <label htmlFor="electricitybiller">Select an operator</label>
              <InputGroup size="lg">
                <InputLeftElement
                  children={
                    loadingElectricityBillers ? (
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
                <Select
                  placeholder="Select an operator"
                  size="lg"
                  onChange={(e) => {
                    const value = e.target.value.split(",");
                    setPaymentCode(value[0]);
                    setDescription(value[1]);
                  }}
                >
                  {allElectricityBillers
                    ? allElectricityBillers.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={[item.paymentCode, item.description]}
                          >
                            {item.description}
                          </option>
                        );
                      })
                    : null}
                </Select>
              </InputGroup>
            </div>

            <div className="inputs">
              <label htmlFor="electricityAmount">Amount</label>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<p style={{ fontSize: "14px" }}>N</p>}
                />
                <NumberFormat
                  className="chakra-input css-1lw1oo1"
                  id="electricityAmount"
                  name="electricityAmount"
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
              <label htmlFor="meterNumber">Meter Number</label>
              <InputGroup size="lg">
                <Input
                  id="meterNumber"
                  name="meterNumber"
                  type="tel"
                  placeholder="1234567890"
                  _placeholder={{ fontSize: 15 }}
                  onChange={(e) => {
                    setMeterNumber(e.target.value);
                    setStaleMeterNumber(e.target.value);
                  }}
                  value={meterNumber}
                />
                <InputRightElement pointerEvents="none">
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    color="#000"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </InputRightElement>
              </InputGroup>
            </div>

            <div className="inputs">
              <label htmlFor="receipient">Receipient</label>
              <InputGroup size="lg">
                <InputRightElement
                  children={
                    isLoadingData ? (
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
                  defaultValue={receipient}
                  readOnly={!customerData}
                />
              </InputGroup>
            </div>

            <div className="submit-button">
              <Button
                size="md"
                colorScheme="red"
                onClick={handleSubmit}
                isLoading={isLoadingInitialize}
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
          transactionHash,
          meterNumber,
          amountWithComma,
          description,
          receipient,
          "Electricity bill payment",
        ]}
      />
    </div>
  );
};

export default Electricity;

// TODO - handle balance checking and handle errors
