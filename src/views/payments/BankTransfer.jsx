//react
import { useEffect, useState } from "react";
//state
import { useRecoilState } from "recoil";
import userState from "../../recoil/userRecoil";
//router
import { Outlet, useNavigate } from "react-router-dom";
//api
import useGetUserInfo from "../../apis/profile/useGetUserInfo";
import useGetAllBanks from "../../apis/payments/banktransfer/useGetAllBanks";
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
//assets
import naira from "../../assets/naira.svg";

const BankTransfer = () => {
  let navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [allBanks, setAllBanks] = useState(null);
  const { isSuccess: isSuccessInfo, data: info } = useGetUserInfo();
  const {
    isSuccess: isSuccessBanks,
    data: banks,
    isLoading: bankLoading,
  } = useGetAllBanks();

  useEffect(() => {
    if (isSuccessInfo) {
      setUser(info.data.data);
    }

    if (isSuccessBanks) {
      setAllBanks(banks.data.data.banks);
    }
  }, [
    isSuccessInfo,
    info,
    user,
    setUser,
    isSuccessBanks,
    banks,
    setAllBanks,
    allBanks,
  ]);

  return (
    <div className="bank-transfer">
      <BackButton />
      <h1 className="page-name">Bank Transfer</h1>

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
              />
            </div>

            <div className="inputs">
              <label htmlFor="receipient">Receipient</label>
              <Input
                id="receipient"
                type="text"
                placeholder="Chukwudi Chike"
                size="lg"
                readOnly
              />
            </div>

            <div className="inputs">
              <label htmlFor="amount">Amount</label>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<p style={{ fontSize: "14px" }}>N</p>}
                />
                <Input id="amount" type="number" placeholder="5,000" />
              </InputGroup>
            </div>

            <div className="inputs">
              <label htmlFor="description">Description</label>
              <Input
                id="description"
                type="text"
                placeholder="School Fees"
                size="lg"
                readOnly
              />
            </div>

            <div className="submit-button">
              <Button
                size="md"
                colorScheme="red"
                // onClick={formik.handleSubmit}
                // isLoading={isLoading ? true : false}
                // isActive={isLoading ? true : false}
              >
                Proceed
              </Button>
            </div>
          </form>
        </main>
      </div>
      <Outlet context={[allBanks, setAllBanks, bankLoading]} />
    </div>
  );
};

export default BankTransfer;
