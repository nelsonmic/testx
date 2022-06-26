import { useMutation } from "react-query";
import axios from "axios";

const setPasswordSettings = async (value) => {
  const { oldPassword, newPassword, confirmPassword, pin } = value;

  return await axios.post(`${process.env.REACT_APP_BASE}/settings/account`, {
    old_password: oldPassword,
    new_password: newPassword,
    new_password_confirmation: confirmPassword,
    pin: pin,
  });
};

const useSetPasswordSettings = () => {
  return useMutation(setPasswordSettings);
};

export default useSetPasswordSettings;
