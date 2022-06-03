import { useQuery } from "react-query";
import axios from "axios";

const getElectricityBillers = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE}/billers/electricity`);
};

const useGetElectricityBillers = () => {
  return useQuery("electricity-billers", getElectricityBillers);
};

export default useGetElectricityBillers;
