import { RestClientApi } from "@utils/types";
import { CreateResponse, CreatePayload } from "./types";

export default (restClient: RestClientApi) => {
    return async (data: CreatePayload) => await restClient<CreateResponse>(`/api/v1/payment`, data, { method: "POST" });
}