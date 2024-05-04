import { RestClientApi } from "@utils/types";
import { ListResponse } from "./types";
import { Pagination } from "@src/types";

export default (restClient: RestClientApi) => {
    return async (pagination: Pagination = {limit: 10, skip: 0}): Promise<ListResponse> => await restClient<ListResponse>(`/api/v1/payment?skip=${pagination.skip}&limit=${pagination.limit}`);
}