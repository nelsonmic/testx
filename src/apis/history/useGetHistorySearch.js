import { useQuery } from "react-query";
import axios from "axios";

const getHistorySearch = async (query) => {

      return await axios.get(`${process.env.REACT_APP_BASE}/userTransaction?search=${query}`);
};

const useGetHistorySearch = (query) => {
      return useQuery(["overview-history", query], () => getHistorySearch(query), { keepPreviousData: true });
};

export default useGetHistorySearch;
