import { useQuery } from "react-query";
import axios from "axios";

const getAllBanks = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE}/getAllBanks`);
};

const useGetAllBanks = () => {
  return useQuery("get-all-banks", getAllBanks);
};

export default useGetAllBanks;
