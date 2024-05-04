import { RestClientApi } from "@utils/types";
import { DeleteResponse, DeletePayload } from "./types";

export default (restClient: RestClientApi) => {
    return (data: DeletePayload) => restClient<DeleteResponse>(`/api/v1/webhook/${data.id}`, { method: 'DELETE' });
}