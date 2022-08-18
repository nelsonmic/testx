import { useQuery } from "react-query";
import axios from "axios";

const getOverviewHistory = async (page) => {

  return await axios.get(`${process.env.REACT_APP_BASE}/userTransaction?page=${page}`);
};

const useGetOverviewHistory = (page) => {
  return useQuery(["overview-history", page], () => getOverviewHistory(page), { keepPreviousData: true });
};

export default useGetOverviewHistory;
