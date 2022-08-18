import { useRecoilState } from "recoil";
//router
import { Outlet, Link } from "react-router-dom";
//state
import userState from "../../../recoil/userRecoil";
//component
import BackButton from "../../../components/BackButton";

const KycSettings = () => {
  const [user] = useRecoilState(userState);
  return (
    <div className="kyc-settings">
      <BackButton times="/settings" />
      <h1 className="page-name">Kyc Settings</h1>
      <div className="wrapper">
        <main>
          <div className="kyc-status">
            <div
              className={user.kyc_level >= 1 ? "status status-done" : "status"}
            >
              <Link to="/settings/kyc">
                <p>Level 1</p>
              </Link>
            </div>

            <div
              className={user.kyc_level >= 1 ? "status status-done" : "status"}
            >
              <Link to={user.kyc_level >= 1 ? "/settings/kyc/lv2" : ""}>
                <p>Level 2</p>
              </Link>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default KycSettings;
