import { useMutation } from "react-query";
import axios from "axios";

const setProfileSetting = async (user, photo, currentPhoto) => {
  const {
    editProfileFirstName,
    editProfileLastName,
    editProfileAddress,
    editProfilePhoto,
    editProfileNok,
    editProfileNokAddress,
    editProfileNokEmail,
    editProfileNokMobile,
    editProfileRelationship,
  } = user;

  return await axios.post(`${process.env.REACT_APP_BASE}/settings/profile`, {
    first_name: editProfileFirstName,
    last_name: editProfileLastName,
    home_address: editProfileAddress,
    photo: editProfilePhoto,
    next_kin: editProfileNok,
    next_kin_address: editProfileNokAddress,
    next_kin_email: editProfileNokEmail,
    next_kin_phone: editProfileNokMobile,
    next_kin_rela: editProfileRelationship,
  });
};

const useSetProfileSettings = () => {
  return useMutation(setProfileSetting);
};

export default useSetProfileSettings;
