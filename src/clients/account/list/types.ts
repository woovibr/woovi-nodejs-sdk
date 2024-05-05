import { PageInfo } from "@src/clients/commonTypes";
import { Account } from "../commonTypes";

export type ListResponse = {
  accounts: Account[];
  pageInfo: PageInfo;
};
