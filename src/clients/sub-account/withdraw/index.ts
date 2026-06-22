import type { RestClientApi } from "@utils/types";
import type { WithDrawPayload, WithDrawResponse } from "./types";

export default (restClient: RestClientApi) => {
  return (data: WithDrawPayload) =>
    restClient<WithDrawResponse>(
      `/api/v1/subaccount/${data.id}/withdraw`,
      { method: "POST" },
    );
};
