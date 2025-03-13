import axios from "axios";

export const getAllBranch = async (url) => {
  const res = await axios.get(url);
  return res;
};
