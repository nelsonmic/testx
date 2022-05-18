import { useMutation } from "react-query";
import axios from "axios";


const setProcessAllTransactions = async ({transactionHash, value}) => {
  return await axios.post(`${process.env.REACT_APP_BASE}/processAllTransactions`, {
    hash: transactionHash,
    pin: value
  });
};

const useSetProcessAllTransactions  = () => {
  return useMutation(setProcessAllTransactions) ;
};

export default useSetProcessAllTransactions ;
