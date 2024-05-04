import { RestClientApi } from "@utils/types";
import { GetPayload, GetResponse } from "./types";

export default (restClient: RestClientApi) => {
    return async (data: GetPayload) => await restClient<GetResponse>(`/api/v1/payment/${data.id}`);
}