import { useQuery } from "react-query";
import axios from "axios";

const getWalletBeneficiary = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE}/walletBeneficiary`);
};

const useGetWalletBeneficiary = () => {
  return useQuery("wallet-beneficiary", getWalletBeneficiary);
};

export default useGetWalletBeneficiary;
