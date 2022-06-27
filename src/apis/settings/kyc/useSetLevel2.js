import { useMutation } from "react-query";
import axios from "axios";

const setKycLevel2 = async (value) => {
  const { bvn, phoneNumber, dob } = value;

  return await axios.post(
    `${process.env.REACT_APP_BASE}/settings/kyc/levelTwo`,
    {
      bvn: bvn,
      phone_number: phoneNumber,
      date_of_birth: dob,
    }
  );
};

const useSetKycLevel2 = () => {
  return useMutation(setKycLevel2);
};

export default useSetKycLevel2;
