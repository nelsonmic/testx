//router
import { Outlet } from "react-router-dom";
//component
import BackButton from "../../../components/BackButton";
const KycSettings = () => {
  return (
    <div className="kyc-settings">
      <BackButton times="/settings" />
      <h1 className="page-name">Kyc Settings</h1>
      <div className="wrapper">
        {/* {isErrorPinSettings && (
          <Alert
            status="error"
            message={errorPinSettings.response.data.message}
          />
        )}

        {isSuccessPinSettings && (
          <Alert status="success" message={"Pin Updated Successfully"} />
        )} */}
        <main>
          <div className="kyc-status">
            <div className="status">
              <p>Level 1</p>
            </div>

            <div className="status">
              <p>Level 2</p>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default KycSettings;
