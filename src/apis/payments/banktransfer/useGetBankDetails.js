import { useQuery } from "react-query";
import axios from "axios";

const getBankDetails = async ({queryKey}) => {
    const [_key, {bankCode, accountNumber}] = queryKey;
  return await axios.get(`${process.env.REACT_APP_BASE}/${_key}?bank_code=${bankCode}&account_number=${accountNumber}`);
};

const useGetBankDetails = (bankCode, accountNumber) => {
  return useQuery(["getBankDetails", {bankCode, accountNumber}], getBankDetails, {
    enabled: false,
});
};

export default useGetBankDetails;
