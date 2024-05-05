import { PageInfo } from "@src/clients/commonTypes";
import { Charge } from "../commonTypes";

export type ListResponse = {
  refunds: Charge[];
  pageInfo: PageInfo;
};
