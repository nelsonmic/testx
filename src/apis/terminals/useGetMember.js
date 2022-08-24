import { useQuery } from "react-query";
import axios from "axios";

const getMember = async () => {
      return await axios.get(`${process.env.REACT_APP_BASE}/Member/terminals`);
};

const useGetMember = () => {
      return useQuery("member-terminal", getMember);
};

export default useGetMember;
