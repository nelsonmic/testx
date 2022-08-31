import { useQuery } from "react-query";
import axios from "axios";

const getAggregator = async (page) => {
      return await axios.get(`${process.env.REACT_APP_BASE}/aggregator/terminals?page=${page}`);
};

const useGetAggregator = (page) => {
      return useQuery(["aggregator-terminal", page], () => getAggregator(page), { keepPreviousData: true });
};

export default useGetAggregator;
