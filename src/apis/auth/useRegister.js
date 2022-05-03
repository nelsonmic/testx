import { useMutation } from "react-query";
import axios from "axios";

const RegisterUser = async (user) => {
    const fullname = user.signupFullname
    const [firstName, lastName] = fullname.split(' ');

  return await axios.post(`${process.env.REACT_APP_BASE}/register`, {
    first_name: firstName,
    last_name: lastName,
    email: user.signupEmail,
    password: user.signupPassword,
    type: user.signupAs,
    phone_number: user.signupPhone,
  });
};

const useRegisterUser = () => {
  return useMutation(RegisterUser);
};

export default useRegisterUser;
