import { PageInfo } from "@src/clients/commonTypes";
import { Refund } from "../commonTypes";

export declare type ListResponse = {
    refunds: Refund[];
    pageInfo: PageInfo;
}