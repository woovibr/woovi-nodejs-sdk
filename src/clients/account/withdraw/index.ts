import { RestClientApi } from "@utils/types";
import { WithdrawResponse, WithdrawPayload } from "./types";

export default (restClient: RestClientApi) => {
  return (data: WithdrawPayload) =>
    restClient<WithdrawResponse>(
      `/api/v1/account/${data.accountId}`,
      { method: "POST" },
      data
    );
};
