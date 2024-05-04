import { PixQRCode } from "../commonTypes";

export declare type CreatePayload = {
    name: string;
    correlationID?: string;
    value?: number;
    comment?: string;
}

export declare type CreateResponse = {
    pixQrCode: PixQRCode & { correlationID: string, brCode: String };
}