import { useMutation } from "react-query";
import axios from "axios";

const setValidateCustomerData = async ({ customerId, paymentCode }) => {
  return await axios.post(
    `${process.env.REACT_APP_BASE}/billers/others/validate`,
    {
      customerid: customerId,
      payment_code: paymentCode,
    }
  );
};

const useSetValidateCustomerData = () => {
  return useMutation(setValidateCustomerData);
};

export default useSetValidateCustomerData;
