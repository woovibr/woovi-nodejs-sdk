import type { RestClientApi } from "@utils/types";
import type { GetPayload, GetResponse } from "./types";
import type { Charge } from "../commonTypes";

export default (restClient: RestClientApi) => {
  return async (data: GetPayload) => {
    if (Array.isArray(data.id)) {
      data.mode ??= "buffer";
      data.streamRoundDelayInMs ??= 100;

      const finalResult: Charge[] | null = data.mode === "buffer" ? [] : null;
      for (const id of data.id) {
        const response = await restClient<GetResponse>(`/api/v1/charge/${id}`);
        if (data.mode === "stream" && data.onData) {
          data.onData(response.charge as Charge);
          await new Promise((resolve) => {
            setTimeout(resolve, data.streamRoundDelayInMs);
          });
        } else {
          finalResult!.push(response.charge as Charge);
        }
      }

      return {
        charge: finalResult,
      };
    }
    return restClient<GetResponse>(`/api/v1/charge/${data.id}`);
  };
};
