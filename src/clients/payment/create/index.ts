import { RestClientApi } from "@utils/types";
import { CreateResponse, CreatePayload } from "./types";

export default (restClient: RestClientApi) => {
    return async (data: CreatePayload): Promise<CreateResponse> => await restClient<CreateResponse>(`/api/v1/payment`, { method: "POST", body: JSON.stringify(data) });
}