import { useQuery } from "react-query";
import axios from "axios";

const getSpecificBiller = async ({ queryKey }) => {
  const [_key, billerId] = queryKey;
  return await axios.get(
    `${process.env.REACT_APP_BASE}/${_key}/data/${billerId}/items`
  );
};

const useGetSpecificBiller = (billerId) => {
  return useQuery(["billers", billerId], getSpecificBiller, {
    enabled: false,
  });
};

export default useGetSpecificBiller;
