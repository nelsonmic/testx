//react
import { useEffect } from "react";
//state
import { useRecoilState } from "recoil";
import userState from "../../../recoil/userRecoil";
//api
import useGetUserInfo from "../../../apis/profile/useGetUserInfo";
//Components
import BackButton from "../../../components/BackButton";
//utils
import * as utils from "../../../utils";
//assets
import naira from "../../../assets/naira.svg";

const Data = () => {
  const [user, setUser] = useRecoilState(userState);
  const { isSuccess: isSuccessInfo, data: info } = useGetUserInfo();
  useEffect(() => {
    if (isSuccessInfo) {
      setUser(info.data.data);
    }
  }, [isSuccessInfo, info, user, setUser]);
  return (
    <div className="data-purchase">
      <BackButton />
      <h1 className="page-name">Buy Data</h1>
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
        </main>
      </div>
    </div>
  );
};

export default Data;
