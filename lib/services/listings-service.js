import useSWR, { mutate } from "swr";
import axios from "axios";

export const useProfile = (handle) => {
  const { data, error } = useSWR(handle ? `/accounts/handles/${handle}` : null);
  if (data && data.data) {
    return data.data;
  }
  return null;
};

export const getListings = async (email) => {
  let resp = await axios.request({
    method: "POST",
    url: "/listings",
    headers: {},
  });
  return resp.data;
};

export const useAccountPosts = (accountId) => {
  const { data, error } = useSWR(
    accountId ? `/timeline?accountId=${accountId}&type=article` : null
  );
  if (data && data.data) {
    return data.data;
  }
  return [];
};