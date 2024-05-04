import { PageInfo } from "@src/clients/commonTypes";
import { PixQRCode } from "../commonTypes";

export declare type ListResponse = {
    pageInfo: PageInfo,
    pixQrCodes: PixQRCode[]
}