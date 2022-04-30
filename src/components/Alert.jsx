import {
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

const AlertMessage = ({status, message}) => {
  return (
    <Alert status={status} variant="left-accent">
      <AlertIcon />
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default AlertMessage;
