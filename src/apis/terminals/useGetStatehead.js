import { useQuery } from "react-query";
import axios from "axios";

const getStatehead = async (page) => {
      return await axios.get(`${process.env.REACT_APP_BASE}/state-head/terminals?page=${page}`);
};

const useGetStatehead = (page) => {
      return useQuery(["statehead-terminal", page], () => getStatehead(page), { keepPreviousData: true });
};

export default useGetStatehead;
