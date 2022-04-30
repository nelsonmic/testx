import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

//auth routes
import Signup from "./views/auth/Signup";
import Signin from "./views/auth/Signin";
import ForgotPassword from "./views/auth/ForgotPassword";

import Overview from "./views/Overview";

function App() {
  const [view, setView] = useState(window.screen.width);
  const [app, setApp] = useState("");

  useEffect(() => {
    window.addEventListener("resize", () => {
      setView(window.screen.width);
    })
    // document.body.requestFullscreen();

    view < 900
      ? setApp(
          <>
            <Routes>
              <Route path="/" element={<Overview />} />

              {/* auth routes */}
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </>
        )
      : setApp(null);
  }, [view]);

  return app;
}

export default App;
