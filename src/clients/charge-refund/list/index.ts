import { RestClientApi } from "@utils/types";
import { GetPayload, ListResponse } from "./types";
import { Pagination } from "@src/types";
import { objectToQueryString } from "@utils/restClient";

export default (restClient: RestClientApi) => {
  return (data: GetPayload, pagination: Pagination = { limit: 10, skip: 0 }) =>
    restClient<ListResponse>(
      `/api/v1/charge/${data.chargeId}/refund?${objectToQueryString({
        ...pagination,
      })}`
    );
};
