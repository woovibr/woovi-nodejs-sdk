import { RestClientApi } from "@utils/types";
import { ListPayload, ListResponse } from "./types";
import { Pagination } from "@src/types";
import { objectToQueryString } from "@utils/restClient";

export default (restClient: RestClientApi) => {
    return (config: {pagination?: Pagination, query?: ListPayload} = { pagination: {limit: 10, skip: 0}, query: {} }) => restClient<ListResponse>(`/api/v1/transaction?${objectToQueryString({...config.pagination, ...config.query})}`)
}   