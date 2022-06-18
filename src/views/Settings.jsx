//router
import { Link } from "react-router-dom";
//state
import { useRecoilState } from "recoil";
import userState from "../recoil/userRecoil";
import userProfileImageState from "../recoil/userProfileImageRecoil";
import AnimatedPage from "../components/AnimatedPage";

//components
import { HStack } from "@chakra-ui/react";
import ImageFormatter from "../components/ImageFormatter";

const Settings = () => {
  const [user, setUser] = useRecoilState(userState);
  const [userProfileImage] = useRecoilState(userProfileImageState);
  console.log(setUser);
  return (
    <div className="settings">
      <h1 className="page-name">Settings</h1>
      <div className="wrapper">
        <AnimatedPage>
          <main>
            <HStack justify="space-between" className="header">
              <span>
                <h1>My Account</h1>
                <p>{user && user.name.toUpperCase()}</p>
              </span>
              <Link to="/profile">
                <ImageFormatter
                  source={user ? user.profile_photo : userProfileImage}
                  height="60px"
                  width="60px"
                  alt="profile"
                />
              </Link>
            </HStack>

            <ul>
              <Link to="/settings/kyc">
                <li>
                  <div className="settings-type">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="15"
                        cy="15"
                        r="15"
                        fill="#FF3A3A"
                        fillOpacity="0.2"
                      />
                      <path
                        d="M12.625 14.5H16.375M12.625 17H16.375M17.625 20.125H11.375C11.0435 20.125 10.7255 19.9933 10.4911 19.7589C10.2567 19.5245 10.125 19.2065 10.125 18.875V10.125C10.125 9.79348 10.2567 9.47554 10.4911 9.24112C10.7255 9.0067 11.0435 8.875 11.375 8.875H14.8663C15.032 8.87504 15.1909 8.94091 15.3081 9.05812L18.6919 12.4419C18.8091 12.5591 18.875 12.718 18.875 12.8837V18.875C18.875 19.2065 18.7433 19.5245 18.5089 19.7589C18.2745 19.9933 17.9565 20.125 17.625 20.125Z"
                        stroke="#FF0000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>
                      <h3>KYC Settings</h3>
                      <p>Help us get to know you</p>
                    </span>
                  </div>
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
                </li>
              </Link>

              <Link to="/settings/pin">
                <li>
                  <div className="settings-type">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="15"
                        cy="15"
                        r="15"
                        fill="#FF3A3A"
                        fillOpacity="0.2"
                      />
                      <path
                        d="M14.1818 20.3636L14.3182 16.6136L11.1477 18.625L10.3295 17.1932L13.6705 15.4545L10.3295 13.7159L11.1477 12.2841L14.3182 14.2955L14.1818 10.5455H15.8182L15.6818 14.2955L18.8523 12.2841L19.6705 13.7159L16.3295 15.4545L19.6705 17.1932L18.8523 18.625L15.6818 16.6136L15.8182 20.3636H14.1818Z"
                        fill="#FF0000"
                      />
                    </svg>

                    <span>
                      <h3>Pin Settings</h3>
                      <p>Change transaction pin</p>
                    </span>
                  </div>
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
                </li>
              </Link>

              <Link to="/settings/password">
                <li>
                  <div className="settings-type">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="15"
                        cy="15"
                        r="15"
                        fill="#FF3A3A"
                        fillOpacity="0.2"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11 13.3333V12.1667C11 9.89667 12.6687 8 15 8C17.3313 8 19 9.89667 19 12.1667V13.3333H19.3333C19.7754 13.3333 20.1993 13.5089 20.5118 13.8215C20.8244 14.134 21 14.558 21 15V20.3333C21 20.7754 20.8244 21.1993 20.5118 21.5118C20.1993 21.8244 19.7754 22 19.3333 22H10.6667C10.2246 22 9.80072 21.8244 9.48816 21.5118C9.17559 21.1993 9 20.7754 9 20.3333V15C9 14.558 9.17559 14.134 9.48816 13.8215C9.80072 13.5089 10.2246 13.3333 10.6667 13.3333H11ZM12 12.1667C12 10.3867 13.2813 9 15 9C16.7187 9 18 10.3867 18 12.1667V13.3333H12V12.1667ZM10 15C10 14.8232 10.0702 14.6536 10.1953 14.5286C10.3203 14.4036 10.4899 14.3333 10.6667 14.3333H19.3333C19.5101 14.3333 19.6797 14.4036 19.8047 14.5286C19.9298 14.6536 20 14.8232 20 15V20.3333C20 20.5101 19.9298 20.6797 19.8047 20.8047C19.6797 20.9298 19.5101 21 19.3333 21H10.6667C10.4899 21 10.3203 20.9298 10.1953 20.8047C10.0702 20.6797 10 20.5101 10 20.3333V15Z"
                        fill="#FF0000"
                      />
                    </svg>

                    <span>
                      <h3>Password Settings</h3>
                      <p>Change account password</p>
                    </span>
                  </div>
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
                </li>
              </Link>

              <Link to="/settings/bank">
                <li>
                  <div className="settings-type">
                    <svg width="30" height="30" viewBox="0 0 43 43" fill="none">
                      <circle cx="21.5" cy="21.5" r="21.5" fill="#FF3A3A20" />
                      <path
                        d="M12 28H32V30H12V28ZM14 20H16V27H14V20ZM19 20H21V27H19V20ZM23 20H25V27H23V20ZM28 20H30V27H28V20ZM12 15L22 10L32 15V19H12V15ZM14 16.236V17H30V16.236L22 12.236L14 16.236ZM22 16C21.7348 16 21.4804 15.8946 21.2929 15.7071C21.1054 15.5196 21 15.2652 21 15C21 14.7348 21.1054 14.4804 21.2929 14.2929C21.4804 14.1054 21.7348 14 22 14C22.2652 14 22.5196 14.1054 22.7071 14.2929C22.8946 14.4804 23 14.7348 23 15C23 15.2652 22.8946 15.5196 22.7071 15.7071C22.5196 15.8946 22.2652 16 22 16Z"
                        fill="#d40000"
                      />
                    </svg>

                    <span>
                      <h3>Bank Settings</h3>
                      <p>Add bank account</p>
                    </span>
                  </div>
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
                </li>
              </Link>
            </ul>
          </main>
        </AnimatedPage>
      </div>
    </div>
  );
};

export default Settings;
