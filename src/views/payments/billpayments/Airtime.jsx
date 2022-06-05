//react
import { useEffect, useState } from "react";
//state
import { useRecoilState } from "recoil";
import userState from "../../../recoil/userRecoil";
//api
import useGetUserInfo from "../../../apis/profile/useGetUserInfo";
import useGetAirtimeBillers from "../../../apis/payments/billpayments/airtime/useGetAirtimeBiller";
import useSetInitializeAirtime from "../../../apis/payments/billpayments/airtime/useSetInitializeAirtime";
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
  InputLeftElement,
  InputRightElement,
  HStack,
  useRadioGroup,
} from "@chakra-ui/react";
import NumberFormat from "react-number-format";
import CustomRadio from "../../../components/CustomRadio";
//utils
import * as utils from "../../../utils";
//assets
import naira from "../../../assets/naira.svg";
import ninemobile from "../../../assets/ninemobile.svg";
import mtn from "../../../assets/mtn.svg";
import airtel from "../../../assets/airtel.svg";
import glo from "../../../assets/glo.svg";

const Airtime = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const { isSuccess: isSuccessInfo, data: info } = useGetUserInfo();

  const [error, setError] = useState("");

  //transaction states
  const [amount, setAmount] = useState("");
  const [amountWithComma, setAmountWithComma] = useState("");
  const [billerId, setBillerId] = useState("");
  const [billerName, setBillerName] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  //api
  const { isSuccess: isSuccessBillers, data: airtimeBillers } =
    useGetAirtimeBillers();

  //initialize airtime purchasee
  const {
    mutate: setInitializeAirtime,
    isLoading: isLoadingInitialize,
    isSuccess: initializeSuccess,
    data: initializeData,
  } = useSetInitializeAirtime();

  useEffect(() => {
    if (isSuccessInfo) {
      setUser(info.data.data);
    }

    if (initializeSuccess) {
      setTransactionHash(initializeData.data.data.hash);
      navigate("/payments/billpayments/airtime/confirm-airtime-transactions");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessInfo, info, setUser, initializeSuccess, initializeData]);

  //formik
  const formik = useFormik({
    initialValues: {
      airtimeAmount: amount,
      airtimePhone: "",
    },
    validationSchema: Yup.object({
      airtimeAmount: Yup.string().required("Required"),
      airtimePhone: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .required("Phone number is required"),
    }),
    onSubmit: (values) => {
      const { airtimeAmount, airtimePhone } = values;
      const data = {
        billerId,
        airtimeAmount,
        airtimePhone,
      };
      if (billerId !== "") {
        setInitializeAirtime(data);
        setPhoneNumber(airtimePhone);
        billerId === "109"
          ? setBillerName("MTN Top-up")
          : billerId === "901"
          ? setBillerName("Airtel Top-up")
          : billerId === "908"
          ? setBillerName("9mobile Top-up")
          : setBillerName("GLO Top-up");
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
      id: isSuccessBillers ? `${airtimeBillers.data.data[0].billerid}` : "",
    },
    {
      name: "glo",
      image: glo,
      id: isSuccessBillers ? `${airtimeBillers.data.data[3].billerid}` : "",
    },
    {
      name: "airtel",
      image: airtel,
      id: isSuccessBillers ? `${airtimeBillers.data.data[1].billerid}` : "",
    },
    {
      name: "ninemobile",
      image: ninemobile,
      id: isSuccessBillers ? `${airtimeBillers.data.data[2].billerid}` : "",
    },
  ];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "airtimebillers",
    defaultValue: "",
    onChange: setBillerId,
  });

  const group = getRootProps();

  return (
    <div className="airtime-purchase">
      <BackButton />
      <h1 className="page-name">Buy Airtime</h1>
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
              <label htmlFor="airtimeAmount">Amount</label>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<p style={{ fontSize: "14px" }}>N</p>}
                />
                <NumberFormat
                  className="chakra-input css-1lw1oo1"
                  id="airtimeAmount"
                  name="airtimeAmount"
                  thousandSeparator={true}
                  value={amount}
                  placeholder="5,000"
                  isNumericString={true}
                  onValueChange={(value) => {
                    setAmount(value.floatValue);
                    setAmountWithComma(value.formattedValue);
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </InputGroup>
              {formik.touched.airtimeAmount && formik.errors.airtimeAmount ? (
                <div className="formik-error">
                  {formik.errors.airtimeAmount}
                </div>
              ) : null}
            </div>

            <div className="inputs">
              <label htmlFor="airtimePhone">Phone Number</label>
              <InputGroup size="lg">
                <Input
                  id="airtimePhone"
                  name="airtimePhone"
                  type="tel"
                  placeholder="+234"
                  _placeholder={{ fontSize: 15 }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.airtimePhone}
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

              {formik.touched.airtimePhone && formik.errors.airtimePhone ? (
                <div className="formik-error">{formik.errors.airtimePhone}</div>
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
          "Airtime purchase",
        ]}
      />
    </div>
  );
};

export default Airtime;

//TODO - add validation for phone number field
