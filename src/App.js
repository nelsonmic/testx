import { useState, useEffect } from "react";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

//components
import BottomNav from "./components/BottomNav";
//auth routes
import Signup from "./views/auth/Signup";
import Signin from "./views/auth/Signin";
import ForgotPassword from "./views/auth/ForgotPassword";
import ResetPassword from "./views/auth/ResetPassword";
import ConfirmEmail from "./views/auth/ConfirmEmail";

//overview route
import Overview from "./views/Overview";

//payment routes

//404 route
import ErrorPage from "./views/Error";

function App() {
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
      "*"
    ];
    
    const allViews = (
      <>
      {!authRoutes.includes(location.pathname) && <BottomNav />}
        <Routes>
          <Route path="/" element={<Overview />} />
  
          {/* auth routes */}
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />

          {/* payment routes */}

          {/* 404 route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
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
  }, [view, location, navigate]);

  return app;
}

export default App;
