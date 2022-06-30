import { useMutation } from "react-query";
import axios from "axios";

const setKycLevel1 = async (value) => {
  const {
    phoneNumber,
    lastName,
    otherName,
    idNumber,
    idImage,
    expiryDate,
    meansOfId,
  } = value;

  return await axios.post(
    `${process.env.REACT_APP_BASE}/settings/kyc/levelOne`,
    {
      phone_number: phoneNumber,
      last_name: lastName,
      other_names: otherName,
      id_number: idNumber,
      photo_of_id: idImage,
      id_expiry_date: expiryDate,
      means_of_id: meansOfId,
    }
  );
};

const useSetKycLevel1 = () => {
  return useMutation(setKycLevel1);
};

export default useSetKycLevel1;
