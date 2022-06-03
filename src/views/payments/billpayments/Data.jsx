//react
import { useEffect, useState } from "react";
//state
import { useRecoilState } from "recoil";
import userState from "../../../recoil/userRecoil";
//api
import useGetUserInfo from "../../../apis/profile/useGetUserInfo";
import useGetDataBillers from "../../../apis/payments/billpayments/databill/useGetDataBiller";
import useGetSpecificBiller from "../../../apis/payments/billpayments/databill/useGetSpecificBiller";
import useSetInitializeDataPurchase from "../../../apis/payments/billpayments/databill/useSetInitializeDataPurchase";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
//router
import { Outlet, useNavigate } from "react-router-dom";
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
  HStack,
  useRadioGroup,
} from "@chakra-ui/react";

import CustomRadio from "../../../components/CustomRadio";
//utils
import * as utils from "../../../utils";
//assets
import naira from "../../../assets/naira.svg";
import ninemobile from "../../../assets/ninemobile.svg";
import mtn from "../../../assets/mtn.svg";
import airtel from "../../../assets/airtel.svg";
import glo from "../../../assets/glo.svg";

const Data = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const { isSuccess: isSuccessInfo, data: info } = useGetUserInfo();

  //transaction states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [amountWithComma, setAmountWithComma] = useState("");
  const [billerId, setBillerId] = useState("");
  const [staleBillerId, setStaleBillerId] = useState("");
  const [billerName, setBillerName] = useState("");
  const [stalePaymentCode, setStalePaymentCode] = useState("");
  const [paymentCode, setPaymentCode] = useState("");
  const [specificBillerItems, setSpecificBillerItems] = useState(null);
  const [transactionHash, setTransactionHash] = useState("");

  //error
  const [error, setError] = useState("");

  // console.log(amount, amountWithComma);

  //api
  const { isSuccess: isSuccessBillers, data: dataBillers } =
    useGetDataBillers();

  //get all biller items
  const {
    isLoading: isLoadingBillerItems,
    isSuccess: billersSuccess,
    data: billerItems,
    refetch: refetchBillerItems,
  } = useGetSpecificBiller(billerId);

  //initialize data purchase
  const {
    mutate: setInitializeDataPurchase,
    isLoading: isLoadingInitialize,
    isSuccess: initializeSuccess,
    data: initializeData,
  } = useSetInitializeDataPurchase();

  useEffect(() => {
    if (isSuccessInfo) {
      setUser(info.data.data);
    }

    if (staleBillerId !== "") {
      refetchBillerItems();
      setStaleBillerId("");
    }
    if (billersSuccess) {
      setSpecificBillerItems(billerItems.data.data);
    }
  }, [
    isSuccessInfo,
    info,
    user,
    setUser,
    refetchBillerItems,
    staleBillerId,
    billersSuccess,
    billerItems,
  ]);

  useEffect(() => {
    if (initializeSuccess) {
      setTransactionHash(initializeData.data.data.hash);
      navigate("/payments/billpayments/data/confirm-data-transactions");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializeSuccess, initializeData, setTransactionHash]);

  //formik
  const formik = useFormik({
    initialValues: {
      dataPhone: "",
    },
    validationSchema: Yup.object({
      dataPhone: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .required("Phone number is required"),
    }),
    onSubmit: (values) => {
      const { dataPhone } = values;
      const data = {
        dataPhone,
        billerId,
        amount,
        paymentCode,
      };
      if (billerId !== "" || paymentCode !== "") {
        setInitializeDataPurchase(data);
        setPhoneNumber(dataPhone);
        billerId === "348"
          ? setBillerName("MTN Mobile Data Plans")
          : billerId === "923"
          ? setBillerName("Airtel Prepaid Data Bundles")
          : billerId === "205"
          ? setBillerName("9mobile Data Bundles")
          : setBillerName("GLO Data Bundles");
      } else {
        setError(true);
      }
    },
  });

  //chakra UI custom Radio
  const list = [
    {
      name: "mtn",
      image: mtn,
      id: isSuccessBillers ? `${dataBillers.data.data[1].billerid}` : "",
    },
    {
      name: "glo",
      image: glo,
      id: isSuccessBillers ? `${dataBillers.data.data[3].billerid}` : "",
    },
    {
      name: "airtel",
      image: airtel,
      id: isSuccessBillers ? `${dataBillers.data.data[2].billerid}` : "",
    },
    {
      name: "ninemobile",
      image: ninemobile,
      id: isSuccessBillers ? `${dataBillers.data.data[0].billerid}` : "",
    },
  ];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "databillers",
    defaultValue: "",
    onChange: (e) => {
      setBillerId(e);
      setStaleBillerId(e);
    },
  });

  const group = getRootProps();

  return (
    <div className="data-purchase">
      <BackButton />
      <h1 className="page-name">Buy Data</h1>
      {error && <Alert status="error" message="Please fill all fields" />}
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

          <form className="bank-transfer-form">
            <div className="inputs billers">
              <label>Select a network</label>

              <HStack justify="space-evenly" {...group}>
                {list.map((value) => {
                  const radio = getRadioProps({ value: value.id });
                  return (
                    <CustomRadio key={value.name} {...radio}>
                      <span>
                        <img src={value.image} alt="" />
                      </span>
                    </CustomRadio>
                  );
                })}
              </HStack>
            </div>

            <div className="inputs">
              <label htmlFor="dataAmount">Data plan</label>
              <InputGroup size="lg">
                <InputLeftElement
                  children={
                    isLoadingBillerItems ? (
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
                  placeholder="Select a data plan"
                  size="lg"
                  value={stalePaymentCode}
                  onChange={(e) => {
                    let value = e.target.value;
                    setPaymentCode(value.split(",")[0]);
                    setAmount(value.split(",")[1] / 100);
                    setStalePaymentCode(e.target.value);
                    setAmountWithComma(
                      utils.numbersWithCommas(value.split(",")[1] / 100)
                    );
                  }}
                >
                  {specificBillerItems
                    ? specificBillerItems.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={[item.paymentCode, item.amount]}
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
              <label htmlFor="dataPhone">Phone Number</label>
              <InputGroup size="lg">
                <Input
                  id="dataPhone"
                  name="dataPhone"
                  type="tel"
                  placeholder="+234"
                  _placeholder={{ fontSize: 15 }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dataPhone}
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

              {formik.touched.dataPhone && formik.errors.dataPhone ? (
                <div className="formik-error">{formik.errors.dataPhone}</div>
              ) : null}
            </div>

            <div className="submit-button">
              <Button
                size="md"
                colorScheme="red"
                onClick={formik.handleSubmit}
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
          "",
          "",
          "",
          transactionHash,
          phoneNumber,
          amountWithComma,
          billerName,
          phoneNumber,
          "Data plan purchase",
        ]}
      />
    </div>
  );
};

export default Data;
