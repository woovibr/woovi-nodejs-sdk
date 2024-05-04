import { Refund } from "../commonTypes";

export declare type CreatePayload = {
  value: number;
  transactionEndToEndId: string;
  correlationID: string;
  comment?: string;
}

export declare type CreateResponse = {
  refund: Refund;
};
