import type { Charge } from "../commonTypes";

export type GetPayload = {
  id: string | string[];
  mode?: "buffer" | "stream";
  onData?: (data: Charge) => void;
  streamRoundDelayInMs?: number;
};

export type GetResponse = {
  charge: Charge | Charge[];
};