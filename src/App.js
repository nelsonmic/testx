import { useState, useEffect } from "react";
import axios from "axios";

import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
//components
import BottomNav from "./components/BottomNav";
import Alert from "./components/Alert";
//auth routes
import Signup from "./views/auth/Signup";
import Signin from "./views/auth/Signin";
import ForgotPassword from "./views/auth/ForgotPassword";
import ResetPassword from "./views/auth/ResetPassword";
import ConfirmEmail from "./views/auth/ConfirmEmail";

//overview route
import Overview from "./views/Overview";
import Profile from "./views/Profile";
import Payments from "./views/Payments";
import Transactions from "./views/Transactions";
import Settings from "./views/Settings";
//Payment >> payment routes
import BankTransfer from "./views/payments/BankTransfer";
import WalletTransfer from "./views/payments/WalletTransfer";
import BillPayments from "./views/payments/Billspayment";
//sub bill payment routes
import Airtime from "./views/payments/billpayments/Airtime";
import Data from "./views/payments/billpayments/Data";
import Electricity from "./views/payments/billpayments/Electricity";
import Others from "./views/payments/billpayments/Others";
//sub payment routes
import BankList from "./views/payments/BankList";
import AllBankBeneficiaryList from "./views/payments/AllBankBeneficiaryList";
import AllWalletBeneficiaryList from "./views/payments/AllWalletBeneficiaryList";

//settings routes
// >> Kyc Settings
import KycSettings from "./views/settings/kyc/KycSettings";
import LvOne from "./views/settings/kyc/LvOne";
import LvTwo from "./views/settings/kyc/LvTwo";
// >> Pin Settings
import PinSettings from "./views/settings/pin/PinSettings";
import PasswordSettings from "./views/settings/PasswordSettings";
import BankSettings from "./views/settings/BankSettings";

//confirm all transactions route
import ConfirmAllTransactions from "./views/ConfirmAllTransactions";
//Pin screens for handling settings
import PinScreen from "./views/PinScreen";

//404 route
import ErrorPage from "./views/Error";

function App() {
  const [interceptorError, setInterceptorError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [view, setView] = useState(window.screen.width);
  const [app, setApp] = useState("");
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const authRoutes = [
      "/sign-in",
      "/sign-up",
      "/forgot-password",
      "/confirm-email",
      "/reset-password",
      "*",
    ];

    axios.interceptors.request.use(
      (config) => {
        config.timeout = 60000;
        if (!authRoutes.includes(location.pathname)) {
          config.headers.Authorization = `Bearer ${localStorage.getItem("AT")}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const data = error.response.data;
        if (
          data.message === "Invalid Token" ||
          data.message === "The refresh token is invalid" ||
          data.message === "Unauthenticated."
        ) {
          setInterceptorError(true);
          setErrorMessage("Unauthenticated. Sign in again.");
          navigate("/sign-in");

          // setTimeout(() => {
          //     if (refreshContainer.style.display == "block") {
          //         window.location.href = "../auth/login.html"
          //     }
          // }, 180000);
        } else {
          setInterceptorError(false);
        }

        return Promise.reject(error);
      }
    );

    const allViews = (
      <>
        {!authRoutes.includes(location.pathname) && <BottomNav />}
        {interceptorError ? (
          <Alert status="error" message={errorMessage} />
        ) : null}
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings />} />

            {/* payment routes */}
            {/* bank payment routes */}
            <Route path="/payments/bank" element={<BankTransfer />}>
              <Route path="bank-list" element={<BankList />} />
              <Route
                path="all-bank-beneficiaries"
                element={<AllBankBeneficiaryList />}
              />
              <Route
                path="confirm-bank-transactions"
                element={
                  <ConfirmAllTransactions transactionType="Receipient Bank" />
                }
              />
            </Route>
            {/* wallet payment routes */}
            <Route path="/payments/wallet" element={<WalletTransfer />}>
              <Route
                path="all-wallet-beneficiaries"
                element={<AllWalletBeneficiaryList />}
              />
              <Route
                path="confirm-wallet-transactions"
                element={
                  <ConfirmAllTransactions transactionType="Receipient Wallet" />
                }
              />
            </Route>
            {/* bill payment routes */}
            <Route path="/payments/billpayments" element={<BillPayments />} />
            <Route path="/payments/billpayments/airtime" element={<Airtime />}>
              <Route
                path="confirm-airtime-transactions"
                element={
                  <ConfirmAllTransactions transactionType="Airtime Biller" />
                }
              />
            </Route>
            <Route path="/payments/billpayments/data" element={<Data />}>
              <Route
                path="confirm-data-transactions"
                element={
                  <ConfirmAllTransactions transactionType="Data Biller" />
                }
              />
            </Route>
            <Route
              path="/payments/billpayments/electricity"
              element={<Electricity />}
            >
              <Route
                path="confirm-electricity-transactions"
                element={
                  <ConfirmAllTransactions transactionType="Electric Biller" />
                }
              />
            </Route>
            <Route path="/payments/billpayments/others" element={<Others />}>
              <Route
                path="confirm-others-transactions"
                element={<ConfirmAllTransactions transactionType="Biller" />}
              />
            </Route>

            {/* settings routes */}
            <Route path="/settings/kyc" element={<KycSettings />}>
              <Route index element={<LvOne />} />
              <Route path="lv2" element={<LvTwo />} />
            </Route>
            <Route path="/settings/pin" element={<PinSettings />} />
            <Route path="/settings/password" element={<PasswordSettings />}>
              <Route
                path="pin"
                element={<PinScreen back="/settings/password/" />}
              />
            </Route>
            <Route path="/settings/bank" element={<BankSettings />}>
              <Route path="bank-list" element={<BankList />} />
              <Route
                path="pin"
                element={<PinScreen back="/settings/bank/" />}
              />
            </Route>

            {/* auth routes */}
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/confirm-email" element={<ConfirmEmail />} />

            {/* 404 route */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AnimatePresence>
      </>
    );

    window.addEventListener("resize", () => {
      setView(window.screen.width);
    });
    // document.body.requestFullscreen();

    if (!authRoutes.includes(location.pathname)) {
      if (
        localStorage.getItem("RT") == null &&
        localStorage.getItem("AT") == null
      ) {
        navigate("/sign-in");
      } else {
        view < 900 ? setApp(allViews) : setApp(null);
      }
    } else {
      view < 900 ? setApp(allViews) : setApp(null);
    }
  }, [view, location, navigate, interceptorError, errorMessage]);

  return app;
}

export default App;

//TODO - handle errors individually
