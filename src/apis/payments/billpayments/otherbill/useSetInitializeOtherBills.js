import { useMutation } from "react-query";
import axios from "axios";

const setInitializeOtherBills = async ({
  billerId,
  finalAmount,
  customerId,
  paymentCode,
  itemFee,
  customername,
}) => {
  console.log(itemFee);
  return await axios.post(
    `${process.env.REACT_APP_BASE}/billers/others/initialize`,
    {
      billerid: billerId,
      amount: finalAmount,
      customerid: customerId,
      payment_code: paymentCode,
      itemfee: itemFee,
      customername: customername,
    }
  );
};

const useSetInitializeOtherBills = () => {
  return useMutation(setInitializeOtherBills);
};

export default useSetInitializeOtherBills;
