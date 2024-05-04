import { RestClientApi } from "@utils/types";
import { GetPayload, GetResponse } from "./types";

export default (restClient: RestClientApi) => {
    return async (data: GetPayload): Promise<GetResponse> => await restClient<GetResponse>(`/api/v1/payment/${data.id}`);
}