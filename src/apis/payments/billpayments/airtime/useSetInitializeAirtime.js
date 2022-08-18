import { useMutation } from "react-query";
import axios from "axios";

const setInitializeAirtime = async ({
  billerId,
  airtimeAmount,
  airtimePhone,
}) => {
  return await axios.post(
    `${process.env.REACT_APP_BASE}/billers/airtime/initialize`,
    {
      billerid: billerId,
      amount: airtimeAmount,
      phone_number: airtimePhone,
    }
  );
};

const useSetInitializeAirtime = () => {
  return useMutation(setInitializeAirtime);
};

export default useSetInitializeAirtime;
