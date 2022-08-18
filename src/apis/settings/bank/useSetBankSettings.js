import { useMutation } from "react-query";
import axios from "axios";

const setBankSettings = async (value) => {
  const { bankName, bankCode, bankAcctName, accountNumber, pin } = value;

  return await axios.post(`${process.env.REACT_APP_BASE}/settings/bank`, {
    bank_name: bankName,
    bank_code: bankCode,
    bank_acct_name: bankAcctName,
    bank_acct_no: accountNumber,
    pin: pin,
  });
};

const useSetBankSettings = () => {
  return useMutation(setBankSettings);
};

export default useSetBankSettings;
