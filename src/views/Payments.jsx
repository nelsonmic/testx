//router
import { Link } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
const Payments = () => {
  return (
    <div className="payments">
      <h1 className="page-name">Payments</h1>
      <AnimatedPage>
        <div className="wrapper">
          <main>
            <header>
              <h2>
                Transfer cash using any of the following methods or make bill
                payments
              </h2>
            </header>

            <ul>
              <Link to="/payments/bank">
                <li>
                  <div className="payment-type">
                    <svg width="30" height="30" viewBox="0 0 43 43" fill="none">
                      <circle cx="21.5" cy="21.5" r="21.5" fill="#FF3A3A20" />
                      <path
                        d="M12 28H32V30H12V28ZM14 20H16V27H14V20ZM19 20H21V27H19V20ZM23 20H25V27H23V20ZM28 20H30V27H28V20ZM12 15L22 10L32 15V19H12V15ZM14 16.236V17H30V16.236L22 12.236L14 16.236ZM22 16C21.7348 16 21.4804 15.8946 21.2929 15.7071C21.1054 15.5196 21 15.2652 21 15C21 14.7348 21.1054 14.4804 21.2929 14.2929C21.4804 14.1054 21.7348 14 22 14C22.2652 14 22.5196 14.1054 22.7071 14.2929C22.8946 14.4804 23 14.7348 23 15C23 15.2652 22.8946 15.5196 22.7071 15.7071C22.5196 15.8946 22.2652 16 22 16Z"
                        fill="#d40000"
                      />
                    </svg>

                    <span>
                      <h3>To Bank Account</h3>
                      <p>Take less than 1 minute</p>
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

              <Link to="/payments/wallet">
                <li>
                  <div className="payment-type">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 43 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="21.5" cy="21.5" r="21.5" fill="#FF3A3A20" />
                      <path
                        d="M31 17H24C22.4087 17 20.8826 17.6321 19.7574 18.7574C18.6321 19.8826 18 21.4087 18 23C18 24.5913 18.6321 26.1174 19.7574 27.2426C20.8826 28.3679 22.4087 29 24 29H31V31C31 31.2652 30.8946 31.5196 30.7071 31.7071C30.5196 31.8946 30.2652 32 30 32H12C11.7348 32 11.4804 31.8946 11.2929 31.7071C11.1054 31.5196 11 31.2652 11 31V15C11 14.7348 11.1054 14.4804 11.2929 14.2929C11.4804 14.1054 11.7348 14 12 14H30C30.2652 14 30.5196 14.1054 30.7071 14.2929C30.8946 14.4804 31 14.7348 31 15V17ZM24 19H32V27H24C22.9391 27 21.9217 26.5786 21.1716 25.8284C20.4214 25.0783 20 24.0609 20 23C20 21.9391 20.4214 20.9217 21.1716 20.1716C21.9217 19.4214 22.9391 19 24 19ZM24 22V24H27V22H24Z"
                        fill="#d40000"
                      />
                    </svg>

                    <span>
                      <h3>To Xtrapay Wallet</h3>
                      <p>Transfer to any Xtrapay wallet</p>
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
              <Link to="/payments/billpayments">
                <li>
                  <div className="payment-type">
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
                        d="M19 22H25H19ZM19 26H25H19ZM27 31H17C16.4696 31 15.9609 30.7893 15.5858 30.4142C15.2107 30.0391 15 29.5304 15 29V15C15 14.4696 15.2107 13.9609 15.5858 13.5858C15.9609 13.2107 16.4696 13 17 13H22.586C22.8512 13.0001 23.1055 13.1055 23.293 13.293L28.707 18.707C28.8946 18.8945 28.9999 19.1488 29 19.414V29C29 29.5304 28.7893 30.0391 28.4142 30.4142C28.0391 30.7893 27.5304 31 27 31Z"
                        stroke="#D40000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>
                      <h3>Pay Bills</h3>
                      <p>Make bill payments easily</p>
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
      </AnimatedPage>
    </div>
  );
};

export default Payments;
