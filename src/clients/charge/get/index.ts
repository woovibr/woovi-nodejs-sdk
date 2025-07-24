import type { RestClientApi } from "@utils/types";
import type { GetPayload, GetResponse } from "./types";
import type { Charge } from "../commonTypes";

export default (restClient: RestClientApi) => {
  return async (data: GetPayload) => {
    if (Array.isArray(data.id)) {
      data.mode ??= "buffer";
      data.chunkRoundDelayInMs ??= 100;
      data.maxChunkSize ??= 10;

      const charges = await parallelizeChargeBatchCalls(
        data.id,
        restClient,
        data.mode,
        data.onData,
        data.chunkRoundDelayInMs,
        data.maxChunkSize
      );

      return {
        charge: charges,
      };
    }
    return restClient<GetResponse>(`/api/v1/charge/${data.id}`);
  };
};

const parallelizeChargeBatchCalls = async (
  ids: string[], restClient: RestClientApi, mode: "buffer" | "stream",
  onData?: (charge: Charge) => void,
  chunkRoundDelayInMs?: number,
  maxChunkSize?: number
): Promise<Charge[] | null> => {
  const chunks = [];
  for (let i = 0; i < ids.length; i += maxChunkSize!) {
    chunks.push(ids.slice(i, i + maxChunkSize!));
  }

  if (mode === "stream" && onData) {
    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (id) => {
          const response = await restClient<GetResponse>(`/api/v1/charge/${id}`);
          onData(response.charge as Charge);
        })
      );
      await new Promise((resolve) => setTimeout(resolve, chunkRoundDelayInMs));
    }
    return null;
  }

  const results: Charge[] = [];
  for (const chunk of chunks) {
    const chunkResults = await Promise.all(
      chunk.map(async (id) => {
        const response = await restClient<GetResponse>(`/api/v1/charge/${id}`);
        return response.charge as Charge;
      })
    );
    results.push(...chunkResults);
    await new Promise((resolve) => setTimeout(resolve, chunkRoundDelayInMs));
  }
  return results;
};