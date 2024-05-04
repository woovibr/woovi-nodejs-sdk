import { PageInfo } from "@src/clients/commonTypes";
import { Destination, Payment, Transaction } from "../commonTypes";

type payments = {
    payment: Payment;
    Destination: Destination;
    transaction: Transaction;
}

export declare type ListResponse = {
    payments: payments[];
    pageInfo: PageInfo;
}