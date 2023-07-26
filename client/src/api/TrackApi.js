import { getAll } from "./base";

export const getTracks = async () => {
  const resp = await getAll(`tracks/?sort_by=title`);
  return resp.result;
};
