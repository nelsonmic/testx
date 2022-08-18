import { useMutation } from "react-query";
import axios from "axios";


const setInitializeFund = async ({amount}) => {
  return await axios.post(`${process.env.REACT_APP_BASE}/deposit/initialize`, {
    amount: amount,
    type: "Deposit",
    site_redirect_url: "https://legacy.xtrapay.ng/dashboard/dashboard.html"
  });
};

const useSetInitializeFund  = () => {
  return useMutation(setInitializeFund) ;
};

export default useSetInitializeFund ;
