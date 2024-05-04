import { destination, payment, transaction } from "../commonTypes";

export declare type ApprovePayload = {
    correlationID: string;
}

export declare type ApproveResponse = {
    payment: payment;
    destination: destination;
    transaction: transaction;
}