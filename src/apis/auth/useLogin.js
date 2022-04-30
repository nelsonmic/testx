import { useMutation } from "react-query";
import axios from "axios";

const loginUser = async (user) => {
  return await axios.post(`${process.env.REACT_APP_BASE}/login`, {
    email: user.signinEmail,
    password: user.signinPassword,
  });
};

const useLoginUser = () => {
  return useMutation(loginUser);
};

export default useLoginUser;
