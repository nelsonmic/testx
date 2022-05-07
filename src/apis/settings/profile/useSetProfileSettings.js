
import { useMutation } from "react-query";
// import axios from "axios";

const setProfileSetting = async (user, firstName, lastName, photo, currentPhoto) => {
    console.log(user);  
  // return await axios.post(`${process.env.REACT_APP_BASE}/settings/profile`, {
  //   first_name: user.first_name,
  //   last_name: user.last_name,
  //   home_address: user.home_address,
  //   photo: user.photo,
  //   next_kin: user.next_kin,
  //   next_kin_address: user.next_kin_address,
  //   next_kin_email: user.next_kin_email,
  //   next_kin_phone: user.next_kin_phone,
  //   next_kin_rela: user.next_kin_rela,
  // });
};

const useSetProfileSettings = () => {
  return useMutation(setProfileSetting);
};

export default useSetProfileSettings;
