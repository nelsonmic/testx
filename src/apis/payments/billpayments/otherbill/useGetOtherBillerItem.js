import { useQuery } from "react-query";
import axios from "axios";

const getOtherBillerItem = async ({ queryKey }) => {
  const [_key, { billerId }] = queryKey;
  return await axios.get(
    `${process.env.REACT_APP_BASE}/billers/others/${billerId}/${_key}`
  );
};

const useGetOtherBillerItem = (billerId) => {
  return useQuery(["items", { billerId }], getOtherBillerItem, {
    enabled: false,
  });
};

export default useGetOtherBillerItem;
