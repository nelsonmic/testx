import { VStack } from "@chakra-ui/react";
import norecenttransactions from "../assets/norecenttransactions.svg";
const NoRecentTransactions = () => {
  return (
    <VStack spacing={4} margin={8}>
      <img src={norecenttransactions} alt="no recent transactions" />
      <p style={{ fontSize: "12px" }}>No recent transactions</p>
    </VStack>
  );
};

export default NoRecentTransactions;
