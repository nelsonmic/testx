import { useMutation } from "react-query";
import axios from "axios";

const setInitializeAirtime = async ({
  amount,
  meterNumber,
  paymentCode,
  accessToken,
  customerName,
  customerAddress,
}) => {
  return await axios.post(
    `${process.env.REACT_APP_BASE}/billers/electricity/initialize`,
    {
      amount: amount,
      meter_number: meterNumber,
      payment_code: paymentCode,
      access_token: accessToken,
      customername: customerName,
      customeraddress: customerAddress,
    }
  );
};

const useSetInitializeAirtime = () => {
  return useMutation(setInitializeAirtime);
};

export default useSetInitializeAirtime;
