import { Destination, Payment, Transaction } from "../commonTypes";

export declare type GetPayload = {
    id: string;
}

export declare type GetResponse = {
    payment: Payment;
    destination: Destination;
    transaction: Transaction;
}