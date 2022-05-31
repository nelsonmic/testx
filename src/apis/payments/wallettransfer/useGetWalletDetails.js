import { useQuery } from "react-query";
import axios from "axios";

const getWalletDetails = async ({ queryKey }) => {
  const [_key, { email }] = queryKey;
  return await axios.get(
    `${process.env.REACT_APP_BASE}/${_key}?receiver_id=${email}`
  );
};

const useGetWalletDetails = (email) => {
  return useQuery(["walletInfo", { email }], getWalletDetails, {
    enabled: false,
  });
};

export default useGetWalletDetails;
