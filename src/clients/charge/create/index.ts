import type { RestClientApi } from "@utils/types";
import type { CreateParams, CreatePayload, CreateResponse } from "./types";
import { objectToQueryString } from "@utils/restClient";

export default (restClient: RestClientApi) => {
  return (data: CreatePayload, params?: CreateParams) =>
    restClient<CreateResponse>(`/api/v1/charge?${objectToQueryString({ ...params })}`,
      { method: "POST" },
      data
    );
};
