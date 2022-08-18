//react
import { useEffect, useState } from "react";
//router
import { useNavigate, Outlet } from "react-router-dom";
//state
import { useRecoilState } from "recoil";
import userState from "../../../recoil/userRecoil";
//api
import useGetUserInfo from "../../../apis/profile/useGetUserInfo";
import useGetOtherBillerCategories from "../../../apis/payments/billpayments/otherbill/useGetOtherBillerCategories";
import useGetSpecificBillerCategory from "../../../apis/payments/billpayments/otherbill/useGetSpecificBillerCategory";
import useGetOtherBillerItem from "../../../apis/payments/billpayments/otherbill/useGetOtherBillerItem";
import useSetValidateCustomerData from "../../../apis/payments/billpayments/otherbill/useSetValidateCustomerData";
import useSetInitializeOtherBills from "../../../apis/payments/billpayments/otherbill/useSetInitializeOtherBills";

//Components
import BackButton from "../../../components/BackButton";
import Alert from "../../../components/Alert";
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

const Others = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  //other billers categories
  const [allOtherBillerCategories, setAllOttherBillersCategories] =
    useState(null);
  const [specificBillerCategory, setSpecificBillerCategory] = useState(null);
  const [otherBillerItems, setOtherBillerItems] = useState(null);

  //all transaction states
  const [categoryId, setCategoryId] = useState("");
  const [billerId, setBillerId] = useState("");
  const [customerField, setCustomerField] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [paymentCode, setPaymentCode] = useState("");
  const [itemFee, setItemFee] = useState("");
  const [amount, setAmount] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [amountWithComma, setAmountWithComma] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [paymentItem, setPaymentItem] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  console.log(
    itemFee,
    amount,
    inputAmount,
    amountWithComma,
    finalAmount,
    customerDetails
  );

  //api calls

  // >> getting user info
  const { isSuccess: isSuccessInfo, data: info } = useGetUserInfo();

  const {
    isSuccess: isSuccessAllCategories,
    data: allCategories,
    isLoading: loadingAllCategories,
  } = useGetOtherBillerCategories();

  const {
    isLoading: loadingSpecificBillerCategory,
    isSuccess: detailsSpecificBillerCategory,
    data: specificBillerCategoryData,
    refetch: refetchSpecificBillerCategory,
  } = useGetSpecificBillerCategory(categoryId);

  const {
    isLoading: loadingOtherBillerItem,
    isSuccess: detailsOtherBillerItem,
    data: otherBillerItemData,
    refetch: refetchOtherBillerItem,
  } = useGetOtherBillerItem(billerId);

  // validate customer data
  const {
    mutate: setValidateCustomerData,
    isLoading: isLoadingValidateCustomerData,
    isSuccess: isSuccessValidateCustomerData,
    data: validateCustomerData,
    isError: isErrorValidateCustomerData,
    error: errorValidateCustomerData,
  } = useSetValidateCustomerData();

  const {
    mutate: setInitializeOtherBills,
    isLoading: isLoadingInitializeOtherBills,
    isSuccess: isSuccessInitializeOtherBills,
    data: initializeOtherBills,
    error: errorInitializeData,
    isError: isErrorInitialize,
  } = useSetInitializeOtherBills();

  useEffect(() => {
    if (isSuccessInfo) {
      setUser(info.data.data);
    }
    if (isSuccessAllCategories) {
      setAllOttherBillersCategories(allCategories.data.data);
    }
    if (detailsSpecificBillerCategory) {
      setSpecificBillerCategory(specificBillerCategoryData.data.data);
    }
    if (detailsOtherBillerItem) {
      setOtherBillerItems(otherBillerItemData.data.data);
      // setItemFee(otherBillerItemData.data.data.item_fee);
    }

    if (isSuccessValidateCustomerData) {
      setCustomerDetails(validateCustomerData.data.data[0].customerId);
    }

    if (isErrorValidateCustomerData) {
      setCustomerDetails(errorValidateCustomerData.response.data.message);
    }

    if (isSuccessInitializeOtherBills) {
      setTransactionHash(initializeOtherBills.data.data.hash);
      navigate("/payments/billpayments/others/confirm-others-transactions");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSuccessInfo,
    info,
    user,
    setUser,
    isSuccessAllCategories,
    allCategories,
    setAllOttherBillersCategories,
    detailsSpecificBillerCategory,
    setSpecificBillerCategory,
    specificBillerCategoryData,
    detailsOtherBillerItem,
    otherBillerItemData,
    setOtherBillerItems,
    isSuccessValidateCustomerData,
    validateCustomerData,
    setCustomerDetails,
    isErrorValidateCustomerData,
    errorValidateCustomerData,
    isSuccessInitializeOtherBills,
    initializeOtherBills,
    errorInitializeData,
    isErrorInitialize,
    setTransactionHash,
  ]);

  const handleValidateCustomerData = () => {
    const value = {
      customerId,
      paymentCode,
    };
    setValidateCustomerData(value);
  };

  const handleInitializeOtherBills = () => {
    const value = {
      billerId,
      finalAmount,
      customerId,
      paymentCode,
      itemFee,
    };
    setInitializeOtherBills(value);
  };

  return (
    <div className="others-purchase">
      <BackButton />
      <h1 className="page-name">Pay Other Bills</h1>
      {isErrorValidateCustomerData && (
        <Alert
          status="error"
          message={errorValidateCustomerData.response.data.message}
        />
      )}
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

          <form className="others-purchase-form">
            <div className="inputs">
              <label htmlFor="electricitybiller">Bill category</label>
              <InputGroup size="lg">
                <InputLeftElement
                  children={
                    loadingAllCategories ? (
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
                  placeholder="Select a bill category"
                  size="lg"
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                  }}
                  onBlur={refetchSpecificBillerCategory}
                >
                  {allOtherBillerCategories
                    ? allOtherBillerCategories.map((item, index) => {
                        return (
                          <option key={index} value={[item.categoryid]}>
                            {item.categoryname}
                          </option>
                        );
                      })
                    : null}
                </Select>
              </InputGroup>
            </div>

            <div className="inputs">
              <label htmlFor="electricitybiller">Category type</label>
              <InputGroup size="lg">
                <InputLeftElement
                  children={
                    loadingSpecificBillerCategory ? (
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
                  placeholder="Select a category type"
                  size="lg"
                  onChange={(e) => {
                    const value = e.target.value.split(",");
                    setBillerId(value[0]);
                    setCustomerField(value[1]);
                    setPaymentItem(value[2]);
                  }}
                  onBlur={refetchOtherBillerItem}
                >
                  {specificBillerCategory
                    ? specificBillerCategory.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={[
                              item.billerid,
                              item.customerfield_1,
                              item.billername,
                            ]}
                          >
                            {item.billername}
                          </option>
                        );
                      })
                    : null}
                </Select>
              </InputGroup>
            </div>

            <div className="inputs">
              <label htmlFor="electricitybiller">Item</label>
              <InputGroup size="lg">
                <InputLeftElement
                  children={
                    loadingOtherBillerItem ? (
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
                  placeholder="Select an item"
                  size="lg"
                  onChange={(e) => {
                    const value = e.target.value.split(",");
                    setPaymentCode(value[0]);
                    setItemFee(value[1]);
                    setAmount(parseInt(value[2]) / 100);
                  }}
                >
                  {otherBillerItems
                    ? otherBillerItems.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={[
                              item.paymentCode,
                              item.itemFee,
                              item.amount,
                            ]}
                          >
                            {item.paymentitemname}
                          </option>
                        );
                      })
                    : null}
                </Select>
              </InputGroup>
            </div>

            <div className="inputs">
              <label htmlFor="customerId">
                {customerField ? customerField : "Customer Id"}
              </label>
              <InputGroup size="lg">
                <Input
                  id="customerId"
                  name="customerId"
                  type="number"
                  placeholder="1234567890"
                  _placeholder={{ fontSize: 15 }}
                  value={customerId}
                  onChange={(e) => {
                    setCustomerId(e.target.value);
                  }}
                />
                <InputRightElement pointerEvents="none">
                  <svg
                    width="16px"
                    height="16px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    color="#000000"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M20.41 8.41l-4.83-4.83c-.37-.37-.88-.58-1.41-.58H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9.83c0-.53-.21-1.04-.59-1.42zM7 7h7v2H7V7zm10 10H7v-2h10v2zm0-4H7v-2h10v2z"></path>
                  </svg>
                </InputRightElement>
              </InputGroup>
            </div>

            <div className="inputs">
              <label htmlFor="electricityAmount">
                {amount === 0 ? "Amount" : "Amount Payable"}
              </label>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<p style={{ fontSize: "14px" }}>N</p>}
                />
                {amount === 0 ? (
                  <NumberFormat
                    className="chakra-input css-1lw1oo1"
                    id="otherbillsAmount"
                    name="otherbillsAmount"
                    thousandSeparator={true}
                    value={inputAmount}
                    placeholder="5,000"
                    isNumericString={true}
                    onValueChange={(value) => {
                      setInputAmount(value.floatValue);
                      setAmountWithComma(value.formattedValue);
                      setFinalAmount(value.floatValue);
                    }}
                  />
                ) : (
                  <NumberFormat
                    className="chakra-input css-1lw1oo1"
                    id="otherbillsAmount"
                    name="otherbillsAmount"
                    thousandSeparator={true}
                    value={amount}
                    placeholder="5,000"
                    isNumericString={true}
                    readOnly
                    onValueChange={(value) => {
                      setAmount(value.floatValue);
                      setAmountWithComma(value.formattedValue);
                      setFinalAmount(value.floatValue);
                    }}
                  />
                )}
              </InputGroup>
            </div>

            <div className="inputs">
              <label htmlFor="customerdetails">Customer Details</label>
              <Input
                size="lg"
                id="customerdetails"
                name="customerdetails"
                type="text"
                placeholder="Chukwudi Chike"
                _placeholder={{ fontSize: 15 }}
                defaultValue={customerDetails}
                readOnly={isErrorValidateCustomerData ? false : true}
              />
            </div>

            <div className="submit-button">
              {isSuccessValidateCustomerData ? (
                <Button
                  size="md"
                  colorScheme="red"
                  onClick={handleInitializeOtherBills}
                  isLoading={isLoadingInitializeOtherBills}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  size="md"
                  colorScheme="red"
                  onClick={handleValidateCustomerData}
                  isLoading={isLoadingValidateCustomerData}
                >
                  Validate
                </Button>
              )}
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
          customerId,
          amountWithComma,
          paymentItem,
          customerDetails,
          "Bill payment",
        ]}
      />
    </div>
  );
};

export default Others;

//TODO: you only have validating the info left on this
