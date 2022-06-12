import { useQuery } from "react-query";
import axios from "axios";

const getOtherBillerCategories = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BASE}/billers/others/categories`
  );
};

const useGetOtherBillerCategories = () => {
  return useQuery("other-billers-categories", getOtherBillerCategories);
};

export default useGetOtherBillerCategories;
