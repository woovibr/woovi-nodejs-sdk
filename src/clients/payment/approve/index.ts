import { RestClientApi } from "@utils/types";
import { ApprovePayload, ApproveResponse } from "./types";

export default (restClient: RestClientApi) => {
    return async (data: ApprovePayload) => await restClient<ApproveResponse>('/api/v1/payment/approve', data, { method: 'POST' });
}