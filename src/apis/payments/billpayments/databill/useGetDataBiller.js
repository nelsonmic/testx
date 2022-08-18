import { useQuery } from "react-query";
import axios from "axios";

const getDataBillers = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE}/billers/data`);
};

const useGetDataBillers = () => {
  return useQuery("data-billers", getDataBillers);
};

export default useGetDataBillers;
