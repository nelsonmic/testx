//router
import { Link } from "react-router-dom";
//state
import { useRecoilState } from "recoil";
import userState from "../recoil/userRecoil";
import userProfileImageState from "../recoil/userProfileImageRecoil";

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
        <main>
          <HStack justify="space-between" className="header">
            <span>
              <h1>My Account</h1>
              <p>{user.name.toUpperCase()}</p>
            </span>
            <ImageFormatter
              source={
                user.profile_photo ? user.profile_photo : userProfileImage
              }
              height="60px"
              width="60px"
              alt="profile"
            />
          </HStack>

          <ul>
            <Link to="">
              <li>
                <div className="settings-type">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 43 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="21.5"
                      cy="21.5"
                      r="21.5"
                      fill="#FF3A3A"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M22 28H22.01H22ZM18 31H26C26.5304 31 27.0391 30.7893 27.4142 30.4142C27.7893 30.0391 28 29.5304 28 29V15C28 14.4696 27.7893 13.9609 27.4142 13.5858C27.0391 13.2107 26.5304 13 26 13H18C17.4696 13 16.9609 13.2107 16.5858 13.5858C16.2107 13.9609 16 14.4696 16 15V29C16 29.5304 16.2107 30.0391 16.5858 30.4142C16.9609 30.7893 17.4696 31 18 31Z"
                      stroke="#D40000"
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

            <Link to="">
              <li>
                <div className="settings-type">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 43 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="21.5"
                      cy="21.5"
                      r="21.5"
                      fill="#FF3A3A"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M22 28H22.01H22ZM18 31H26C26.5304 31 27.0391 30.7893 27.4142 30.4142C27.7893 30.0391 28 29.5304 28 29V15C28 14.4696 27.7893 13.9609 27.4142 13.5858C27.0391 13.2107 26.5304 13 26 13H18C17.4696 13 16.9609 13.2107 16.5858 13.5858C16.2107 13.9609 16 14.4696 16 15V29C16 29.5304 16.2107 30.0391 16.5858 30.4142C16.9609 30.7893 17.4696 31 18 31Z"
                      stroke="#D40000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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

            <Link to="">
              <li>
                <div className="settings-type">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 43 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="21.5"
                      cy="21.5"
                      r="21.5"
                      fill="#FF3A3A"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M15 31.6H15.39L22.27 21.42C22.36 21.24 22.31 21.15 22.12 21.15H19.28L22.27 15.7C22.36 15.52 22.29 15.43 22.07 15.43H18.26C18.15 15.43 18.06 15.49 17.97 15.61L15.19 23.01C15.17 23.19 15.23 23.28 15.38 23.28H18.13L15 31.6V31.6ZM23.5 25.27H23.77L28.99 17.6C29.04 17.52 29.05 17.45 29.03 17.4C29.01 17.35 28.95 17.33 28.86 17.33H26.76L28.94 13.3C29.06 13.1 29 13 28.76 13H26.02C25.89 13 25.79 13.06 25.72 13.19L23.64 18.67C23.61 18.76 23.61 18.83 23.65 18.88C23.69 18.93 23.75 18.95 23.84 18.95H25.88L23.5 25.27V25.27Z"
                      fill="#D40000"
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

            <Link to="">
              <li>
                <div className="settings-type">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 43 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="21.5"
                      cy="21.5"
                      r="21.5"
                      fill="#FF3A3A"
                      fillOpacity="0.2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13 13H22V22H13V13ZM14.2857 14.2857H20.7143V20.7143H14.2857V14.2857ZM15.5714 15.5714H19.4286V19.4286H15.5714V15.5714ZM16.8571 16.8571H18.1429V18.1429H16.8571V16.8571ZM23.2857 14.2857H29.7143V20.7143H23.2857V14.2857ZM24.5714 15.5714H28.4286V19.4286H24.5714V15.5714ZM25.8571 16.8571H27.1429V18.1429H25.8571V16.8571ZM31 22H22V31H31V22ZM29.7143 23.2857H23.2857V29.7143H29.7143V23.2857ZM28.4286 24.5714H24.5714V28.4286H28.4286V24.5714ZM27.1429 25.8571H25.8571V27.1429H27.1429V25.8571ZM20.7143 23.2857H14.2857V29.7143H20.7143V23.2857ZM19.4286 24.5714H15.5714V28.4286H19.4286V24.5714ZM18.1429 25.8571H16.8571V27.1429H18.1429V25.8571Z"
                      fill="#D40000"
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
      </div>
    </div>
  );
};

export default Settings;
