import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

//state
import userState from "../recoil/userRecoil";
import userProfileImageState from "../recoil/userProfileImageRecoil";

//api
import useGetUserInfo from "../apis/profile/useGetUserInfo";
//assets
import naira from ".././assets/naira.svg";
//components
import ImageFormatter from ".././components/ImageFormatter";
//utils
import * as utils from "../utils";

const Overview = () => {
  //   let navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [userProfileImage, setUserProfileImage] = useRecoilState(userProfileImageState);
  const { isSuccess, data } = useGetUserInfo();
  

  useEffect(() => {
    if (isSuccess) {
      setUser(data.data.data);
      setUserProfileImage(data.data.data.profile_photo);
    }
  },[isSuccess, data, user, setUser, setUserProfileImage]);


  return (
    <div className="overview">
      <h3 className="page-name">Overview</h3>
      <header>
        <div className="menu">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="#d40000"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            ></path>
          </svg>
        </div>

        <div className="user-greet">
          <h1>Hey {utils.truncateText(user? user.name.split(' ').slice(0, -1).join(' '):"", 8)}!</h1>
          <Link to="/profile">
          <ImageFormatter
            source={userProfileImage}
            width="40px"
            height="40px"
            alt="User display profile"
          />
          </Link>
        </div>
      </header>
      <div className="wrapper">
        <main>
          <div className="balance-container">
            <h2>Current Balance</h2>
            <p className="account-balance">
              <img src={naira} alt="naira" />
              {user? utils.numbersWithCommas(utils.truncateDecimals(user.balance)) : "0"}
            </p>

            <div className="balance-ctrls">
              <div>
                <span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.8884 12.8957H15.8404C13.9434 12.8957 12.3994 11.3527 12.3984 9.45667C12.3984 7.55867 13.9424 6.01467 15.8404 6.01367H19.8884C20.3024 6.01367 20.6384 6.34967 20.6384 6.76367C20.6384 7.17767 20.3024 7.51367 19.8884 7.51367H15.8404C14.7694 7.51467 13.8984 8.38567 13.8984 9.45567C13.8984 10.5247 14.7704 11.3957 15.8404 11.3957H19.8884C20.3024 11.3957 20.6384 11.7317 20.6384 12.1457C20.6384 12.5597 20.3024 12.8957 19.8884 12.8957Z"
                      fill="black"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.2983 10.1436H15.9863C15.5723 10.1436 15.2363 9.80755 15.2363 9.39355C15.2363 8.97955 15.5723 8.64355 15.9863 8.64355H16.2983C16.7123 8.64355 17.0483 8.97955 17.0483 9.39355C17.0483 9.80755 16.7123 10.1436 16.2983 10.1436Z"
                      fill="black"
                    />
                    <mask
                      id="mask0_3244_4166"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="21"
                      height="20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 0H20.6386V19.1729H0V0Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_3244_4166)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.998 1.5C3.518 1.5 1.5 3.518 1.5 5.998V13.175C1.5 15.655 3.518 17.673 5.998 17.673H14.642C17.122 17.673 19.139 15.655 19.139 13.175V5.998C19.139 3.518 17.122 1.5 14.642 1.5H5.998ZM14.642 19.173H5.998C2.691 19.173 0 16.482 0 13.175V5.998C0 2.69 2.691 0 5.998 0H14.642C17.949 0 20.639 2.69 20.639 5.998V13.175C20.639 16.482 17.949 19.173 14.642 19.173Z"
                        fill="black"
                      />
                    </g>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.6842 6.03809H5.28516C4.87116 6.03809 4.53516 5.70209 4.53516 5.28809C4.53516 4.87409 4.87116 4.53809 5.28516 4.53809H10.6842C11.0982 4.53809 11.4342 4.87409 11.4342 5.28809C11.4342 5.70209 11.0982 6.03809 10.6842 6.03809Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <p>fund</p>
              </div>
              <div>
                <span>
                  <svg
                    width="20"
                    height="20"
                    version="1.1"
                    viewBox="0 0 700 700"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path d="m585.2 156.8h-89.598v-22.402h67.199v-56c0-2.9688-1.1797-5.8164-3.2812-7.918-2.1016-2.1016-4.9492-3.2812-7.918-3.2812h-403.2c-6.1836 0-11.199 5.0156-11.199 11.199v56h67.199v22.402h-89.598v-78.402c0-8.9102 3.5391-17.457 9.8398-23.758s14.848-9.8398 23.758-9.8398h403.2c8.9102 0 17.457 3.5391 23.758 9.8398s9.8398 14.848 9.8398 23.758z" />
                      <path d="m462 515.2h-224c-8.9102 0-17.457-3.5391-23.758-9.8398-6.3008-6.3008-9.8438-14.848-9.8438-23.758v-436.8h291.2v436.8c0 8.9102-3.543 17.457-9.8438 23.758-6.3008 6.3008-14.848 9.8398-23.758 9.8398zm-235.2-448v414.4c0 2.9688 1.1797 5.8164 3.2812 7.918 2.0977 2.1016 4.9492 3.2812 7.918 3.2812h224c2.9688 0 5.8203-1.1797 7.918-3.2812 2.1016-2.1016 3.2812-4.9492 3.2812-7.918v-414.4z" />
                      <path d="m350 331.74c-7.4297 0.058593-14.555-2.9375-19.711-8.2852l-23.746-23.746c-5.25-5.2148-8.207-12.309-8.207-19.711s2.957-14.496 8.207-19.711l23.746-23.746c5.2148-5.25 12.309-8.207 19.711-8.207s14.496 2.957 19.711 8.207l23.746 23.746c5.25 5.2148 8.207 12.309 8.207 19.711s-2.957 14.496-8.207 19.711l-23.746 23.746c-5.1562 5.3477-12.281 8.3438-19.711 8.2852zm0-81.09v0.003906c-1.4961-0.015625-2.9375 0.54688-4.0312 1.5664l-23.746 23.746c-2.0508 2.2969-2.0508 5.7656 0 8.0625l23.746 23.746c2.2969 2.0508 5.7656 2.0508 8.0625 0l23.746-23.746c2.0508-2.2969 2.0508-5.7656 0-8.0625l-23.746-23.746c-1.0938-1.0195-2.5352-1.582-4.0312-1.5664z" />
                      <path d="m406 112h22.398v67.199h-22.398z" />
                      <path d="m271.6 380.8h22.398v67.199h-22.398z" />
                      <path d="m529.2 470.4h-33.598v-22.398h33.602-0.003906c2.9727 0 5.8203-1.1797 7.9219-3.2812 2.0977-2.0977 3.2773-4.9492 3.2773-7.918v-235.2h22.398l0.003906 235.2c0 8.9102-3.5391 17.457-9.8438 23.758-6.3008 6.3008-14.848 9.8398-23.758 9.8398z" />
                    </g>
                  </svg>
                </span>
                <p>Withdraw</p>
              </div>
              <div>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    color="#000"
                  >
                    <path d="M0 0h24v24H0z" fill="none" strokeWidth=".1"></path>
                    <path
                      strokeWidth=".1"
                      d="M16 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM2 12c0-2.79 1.64-5.2 4.01-6.32V3.52C2.52 4.76 0 8.09 0 12s2.52 7.24 6.01 8.48v-2.16A6.99 6.99 0 012 12zm13-9c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"
                    ></path>
                  </svg>
                </span>
                <p>Xpoints</p>
              </div>
            </div>
          </div>

          <div className="quick-action-container">
            <p className="desc">Quick Actions</p>
            <div className="quick-action-items">
              <div className="royalties">
                <span>
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    color="#000"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <p>Royalties</p>
              </div>

              <div className="dokitor">
                <span>
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    color="#000"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm6 11h-3v3h-2v-3H8v-2h3v-3h2v3h3v2z"></path>
                  </svg>
                </span>
                <p>Dokitor</p>
              </div>
            </div>
          </div>

          <div className="recent-transaction-history">
            <p className="desc">Recent Transactions</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Overview;
