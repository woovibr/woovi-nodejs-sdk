import { PageInfo } from "@src/clients/commonTypes";
import { Customer } from "../commonTypes";

export type ListResponse = {
  customers: Customer[];
  pageInfo: PageInfo;
};
