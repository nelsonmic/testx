import { useMutation } from "react-query";
import axios from "axios";

const getCustomerData = async ({ paymentCode, meterNumber }) => {
  return await axios.post(
    `${process.env.REACT_APP_BASE}/billers/electricity/validate`,
    {
      payment_code: paymentCode,
      meter_number: meterNumber,
    }
  );
};

const useGetCustomerData = () => {
  return useMutation(getCustomerData);
};

export default useGetCustomerData;
