import { PageInfo } from "@src/clients/commonTypes";
import { ChargeRefund } from "../commonTypes";

export type ListPayload = {
  chargeId: string;
};

export type ListResponse = {
  refunds: ChargeRefund[];
  pageInfo: PageInfo;
};
