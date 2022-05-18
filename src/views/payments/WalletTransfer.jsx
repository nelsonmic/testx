//react
import { useEffect } from "react";
//state
import { useRecoilState } from "recoil";
import userState from "../../recoil/userRecoil";
//api
import useGetUserInfo from "../../apis/profile/useGetUserInfo";
//utils
import * as utils from "../../utils";
//components
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import BackButton from "../../components/BackButton";
//assets
import naira from "../../assets/naira.svg";

const WalletTransfer = () => {
  const [user, setUser] = useRecoilState(userState);
  const { isSuccess, data } = useGetUserInfo();

  useEffect(() => {
    if (isSuccess) {
      setUser(data.data.data);
    }
  }, [isSuccess, data, user, setUser]);

  return (
    <div className="wallet-transfer">
      <BackButton />
      <h1 className="page-name">Wallet Transfer</h1>

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
                <Input id="wallet-amount" type="number" placeholder="5,000" />
              </InputGroup>
            </div>

            <div className="inputs">
              <label htmlFor="wallet-email">Email Address</label>
              <Input
                id="wallet-email"
                type="email"
                placeholder="receiveremail@example.com"
                size="lg"
              />
            </div>

            <div className="inputs">
              <label htmlFor="wallet-description">Description</label>
              <Input
                id="wallet-description"
                type="text"
                placeholder="School Fees"
                size="lg"
                readOnly
              />
            </div>

            <div className="inputs">
              <label htmlFor="wallet-receipient">Receipient</label>
              <Input
                id="wallet-receipient"
                type="text"
                placeholder="Chukwudi Chike"
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
    </div>
  );
};

export default WalletTransfer;
