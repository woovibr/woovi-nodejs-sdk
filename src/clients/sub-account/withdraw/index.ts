import { RestClientApi } from "@utils/types";
import { WithDrawPayload } from "./types";

export default (restClient: RestClientApi) => {
    return (data: WithDrawPayload) => restClient<WithDrawPayload>(`/api/v1/subaccount/${data.id}/withdraw`, {}, { method: "POST" });
}