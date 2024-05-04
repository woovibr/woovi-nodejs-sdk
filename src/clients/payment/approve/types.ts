import { Destination, Payment, Transaction } from "../commonTypes";

export declare type ApprovePayload = {
    correlationID: string;
}

export declare type ApproveResponse = {
    payment: Payment;
    destination: Destination;
    transaction: Transaction;
}