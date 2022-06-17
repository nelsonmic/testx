import { useMutation } from "react-query";
import axios from "axios";

const setInitializeOtherBills = async ({
  billerId,
  finalAmount,
  customerId,
  paymentCode,
  itemfee,
  customername,
}) => {
  return await axios.post(
    `${process.env.REACT_APP_BASE}/billers/others/initialize`,
    {
      billerid: billerId,
      amount: finalAmount,
      customerid: customerId,
      payment_code: paymentCode,
      itemfee: itemfee,
      customername: customername,
    }
  );
};

const useSetInitializeOtherBills = () => {
  return useMutation(setInitializeOtherBills);
};

export default useSetInitializeOtherBills;
