import { useQuery } from "react-query";
import axios from "axios";

const getAgentTransactions = async (page, serial) => {
      return await axios.get(`${process.env.REACT_APP_BASE}/agent/terminal/${serial}?page=${page}`);
};

const useGetAgentTransactions = (page, serial) => {
      return useQuery(["agent-terminal-transactions", page], () => getAgentTransactions(page, serial), { keepPreviousData: true, enabled: !!serial });

};

export default useGetAgentTransactions;
