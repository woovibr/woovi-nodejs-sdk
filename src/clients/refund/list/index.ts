import { RestClientApi } from "@utils/types";
import { ListResponse } from "./types";
import { Pagination } from "@src/types";

export default (restClient: RestClientApi) => {
    return (pagination: Pagination = {limit: 10, skip: 0}) => restClient<ListResponse>(`/api/v1/refund?skip=${pagination.skip}&limit=${pagination.limit}`);
}