import type { Charge } from "../commonTypes";

export type GetPayload = {
  id: string | string[];
  mode?: "buffer" | "stream";
  onData?: (data: Charge) => void;
  chunkRoundDelayInMs?: number;
  maxChunkSize?: number;
};

export type GetResponse = {
  charge: Charge | Charge[];
};