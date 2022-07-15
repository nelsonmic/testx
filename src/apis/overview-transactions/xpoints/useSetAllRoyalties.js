import { useMutation } from "react-query";
import axios from "axios";


const setHandleRoyalties = async ({royalty}) => {
  return await axios.post(`${process.env.REACT_APP_BASE}/royalty/transfer?royalty=${royalty}`, {
    royalty: royalty,
  });
};

const useSetHandleRoyalties  = () => {
  return useMutation(setHandleRoyalties) ;
};

export default useSetHandleRoyalties ;
