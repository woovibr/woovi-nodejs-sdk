import { RestClientApi } from "@utils/types";
import { ListResponse } from "./types";

export default (restClient: RestClientApi) => {
    return async (): Promise<ListResponse> => await restClient<ListResponse>('/api/v1/payment');
}