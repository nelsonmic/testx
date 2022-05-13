import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { useState , useEffect} from "react";

const AlertMessage = ({ status, message }) => {
  const [alert, setAlert] = useState(
    <div className="alert-message">
      <Alert status={status} variant="left-accent">
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
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
