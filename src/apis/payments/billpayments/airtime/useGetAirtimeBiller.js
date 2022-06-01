import { useQuery } from "react-query";
import axios from "axios";

const getAirtimeBillers = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE}/billers/airtime`);
};

const useGetAirtimeBillers = () => {
  return useQuery("airtime-billers", getAirtimeBillers);
};

export default useGetAirtimeBillers;
