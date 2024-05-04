import { PageInfo } from "@src/clients/commonTypes";
import { PixQRCode } from "../commonTypes";

export  type ListResponse = {
    pageInfo: PageInfo,
    pixQrCodes: PixQRCode[]
}