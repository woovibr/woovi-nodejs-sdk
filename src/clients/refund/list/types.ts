import { PageInfo } from "@src/clients/commonTypes";
import { Refund } from "../commonTypes";

export  type ListResponse = {
    refunds: Refund[];
    pageInfo: PageInfo;
}