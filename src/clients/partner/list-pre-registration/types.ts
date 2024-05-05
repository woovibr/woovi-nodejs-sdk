import { PageInfo } from "@src/clients/commonTypes";
import { PreRegistration } from "../commonTypes";

export type ListResponse = {
  preRegistrations: PreRegistration[];
  pageInfo: PageInfo;
};
