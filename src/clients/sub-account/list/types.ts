import { PageInfo } from "@src/clients/commonTypes";
import { SubAccount } from "../commonTypes";

export type ListResponse = {
  subAccounts: SubAccount[];
  pageInfo: PageInfo;
}