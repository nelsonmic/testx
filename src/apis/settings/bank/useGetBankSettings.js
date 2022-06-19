import { useQuery } from "react-query";
import axios from "axios";

const getBankSettings = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE}/settings/bank`);
};

const useGetBankSettings = () => {
  return useQuery("get-bank-settings", getBankSettings);
};

export default useGetBankSettings;
