import { PageInfo } from "@src/clients/commonTypes";
import { ChargeRefund } from "../commonTypes";

export type GetPayload = {
  chargeId: string;
};

export type ListResponse = {
  refunds: ChargeRefund[];
  pageInfo: PageInfo;
};
