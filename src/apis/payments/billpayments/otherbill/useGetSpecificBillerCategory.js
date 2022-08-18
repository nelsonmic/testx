import { useQuery } from "react-query";
import axios from "axios";

const getSpecificBillerCategory = async ({ queryKey }) => {
  const [_key, { categoryId }] = queryKey;
  return await axios.get(
    `${process.env.REACT_APP_BASE}/billers/others/${_key}/${categoryId}`
  );
};

const useGetSpecificBillerCategory = (categoryId) => {
  return useQuery(["category", { categoryId }], getSpecificBillerCategory, {
    enabled: false,
  });
};

export default useGetSpecificBillerCategory;
