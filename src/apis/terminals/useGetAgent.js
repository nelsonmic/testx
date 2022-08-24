import { useQuery } from "react-query";
import axios from "axios";

const getAgent = async () => {
      return await axios.get(`${process.env.REACT_APP_BASE}/agent/terminals`);
};

const useGetAgent = () => {
      return useQuery("agent-terminal", getAgent);
};

export default useGetAgent;
