import { RestClientApi } from "@utils/types";
import { ListResponse } from "./types";

export default (restClient: RestClientApi) => {
  return () => restClient<ListResponse>(`/api/v1/partner/company`);
};
