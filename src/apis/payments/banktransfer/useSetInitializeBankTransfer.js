import { useMutation } from "react-query";
import axios from "axios";


const setInitializeBankTransfer = async ({selectBankCode, selectedBank, accountNumber, receipientName, description, amount}) => {
  return await axios.post(`${process.env.REACT_APP_BASE}/initialize/bank/transfer`, {
    bank_code: selectBankCode,
    bank_name: selectedBank,
    bank_account_number: accountNumber,
    bank_account_name: receipientName,
    narration: description,
    amount: amount
  });
};

const useSetInitializeBankTransfer  = () => {
  return useMutation(setInitializeBankTransfer) ;
};

export default useSetInitializeBankTransfer ;
