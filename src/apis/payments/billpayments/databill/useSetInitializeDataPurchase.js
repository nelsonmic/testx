import { useMutation } from "react-query";
import axios from "axios";

const setInitializeDataPurchase = async ({
  billerId,
  amount,
  dataPhone,
  paymentCode,
}) => {
  return await axios.post(
    `${process.env.REACT_APP_BASE}/billers/data/initialize`,
    {
      billerid: billerId,
      amount: amount,
      phone_number: dataPhone,
      payment_code: paymentCode,
    }
  );
};

const useSetInitializeDataPurchase = () => {
  return useMutation(setInitializeDataPurchase);
};

export default useSetInitializeDataPurchase;
