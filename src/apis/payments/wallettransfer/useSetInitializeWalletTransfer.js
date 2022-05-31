import { useMutation } from "react-query";
import axios from "axios";

const setInitializeWalletTransfer = async ({
  receipientWalletAddress,
  amount,
  description,
}) => {
  return await axios.post(
    `${process.env.REACT_APP_BASE}/initialize/wallet/transfer`,
    {
      wallet_to: receipientWalletAddress,
      amount: amount,
      narration: description,
    }
  );
};

const useSetInitializeWalletTransfer = () => {
  return useMutation(setInitializeWalletTransfer);
};

export default useSetInitializeWalletTransfer;
