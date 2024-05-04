import { destination, payment, transaction } from "../commonTypes";

export declare type GetPayload = {
    id: string;
}

export declare type GetResponse = {
    payment: payment;
    destination: destination;
    transaction: transaction;
}