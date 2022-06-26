import { useMutation } from "react-query";
import axios from "axios";

const setPinSettings = async (value) => {
  const { oldPin, newPin, confirmPin } = value;

  return await axios.post(`${process.env.REACT_APP_BASE}/settings/wallet`, {
    old_pin: parseInt(oldPin),
    new_pin: parseInt(newPin),
    new_pin_confirmation: parseInt(confirmPin),
  });
};

const useSetPinSettings = () => {
  return useMutation(setPinSettings);
};

export default useSetPinSettings;
