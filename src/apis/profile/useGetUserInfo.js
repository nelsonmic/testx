import { useQuery } from "react-query";
import axios from "axios";

const getUserInfo = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE}/userInfo`);
};

const useGetUserInfo = () => {
  return useQuery("user-info", getUserInfo);
};

export default useGetUserInfo;
