import { useQuery } from "react-query";
import axios from "axios";

const getBankBeneficiary = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE}/bankBeneficiary`);
};

const useGetBankBeneficiary = () => {
  return useQuery("bank-beneficiary", getBankBeneficiary);
};

export default useGetBankBeneficiary;
