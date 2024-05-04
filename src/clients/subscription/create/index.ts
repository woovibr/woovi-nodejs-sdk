import { RestClientApi } from "@utils/types";
import { CreateResponse, CreatePayload } from "./types";

export default (restClient: RestClientApi) => {
    return (data: CreatePayload) => restClient<CreateResponse>(`/api/v1/subscriptions`, data, { method: "POST" });
}