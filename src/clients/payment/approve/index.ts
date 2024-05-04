import { RestClientApi } from "@utils/types";
import { ApprovePayload, ApproveResponse } from "./types";

export default (restClient: RestClientApi) => {
    return async (data: ApprovePayload): Promise<ApproveResponse> => await restClient<ApproveResponse>('/api/v1/payment/approve', { method: 'POST', body: JSON.stringify(data) });
}