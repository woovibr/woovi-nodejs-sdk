import { PageInfo } from "@src/clients/commonTypes";
import { Webhook } from "../commonTypes";

export type ListPayload = {
    url: string;
}

export  type ListResponse = {
    pageInfo: PageInfo,
    pixQrCodes: Webhook[]
}