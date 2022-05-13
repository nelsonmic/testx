import { useQuery } from "react-query";
import axios from "axios";

const getProfileSettings = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE}/settings/profile`);
};

const useGetProfileSettings = () => {
  return useQuery("profile-settings", getProfileSettings);
};

export default useGetProfileSettings;
