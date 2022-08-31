import { useMutation } from "react-query";
import axios from "axios";

const setPinSettings = async (value) => {
  const { oldPin, newPin, confirmPin } = value;


  return await axios.post(`${process.env.REACT_APP_BASE}/settings/wallet`, {
    pin: oldPin,
    new_pin: newPin,
    new_pin_confirmation: confirmPin,
  });
};

const useSetPinSettings = () => {
  return useMutation(setPinSettings);
};

export default useSetPinSettings;
