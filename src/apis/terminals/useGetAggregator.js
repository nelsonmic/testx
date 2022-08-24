import { useQuery } from "react-query";
import axios from "axios";

const getAggregator = async () => {
      return await axios.get(`${process.env.REACT_APP_BASE}/aggregator/terminals`);
};

const useGetAggregator = () => {
      return useQuery("aggregator-terminal", getAggregator);
};

export default useGetAggregator;
