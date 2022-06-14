import { useQuery } from "react-query";
import axios from "axios";

const getOverviewHistory = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE}/userTransaction`);
};

const useGetOverviewHistory = () => {
  return useQuery("overview-history", getOverviewHistory);
};

export default useGetOverviewHistory;
