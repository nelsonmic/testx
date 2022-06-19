import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AnimatedPage from "./AnimatedPage";

const AlertMessage = ({ status, message }) => {
  const [alert, setAlert] = useState(
    <AnimatedPage>
      <div className="alert-message">
        <Alert status={status} variant="left-accent">
          <AlertIcon />
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      </div>
    </AnimatedPage>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(null);
    }, 3000);
    return () => clearTimeout(timer);
  });

  return alert;
};

export default AlertMessage;
