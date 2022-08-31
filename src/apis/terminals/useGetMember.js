import { useQuery } from "react-query";
import axios from "axios";

const getMember = async (page) => {
      return await axios.get(`${process.env.REACT_APP_BASE}/transactions/auditLog?page=${page}`);
};

const useGetMember = (page) => {
      return useQuery(["member-terminal", page], () => getMember(page), { keepPreviousData: true });
};

export default useGetMember;
