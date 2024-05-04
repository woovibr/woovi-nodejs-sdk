import { PageInfo } from "@src/clients/commonTypes";
import { Transaction } from "../commonTypes";

export type ListPayload = {
    start?: string;
    end?: string;
    charge?: string;
    pixQrCode?: string;
    withdrawal?: string;
  }

export type ListResponse = {
    transactions: Transaction[];
    pageInfo: PageInfo;
}