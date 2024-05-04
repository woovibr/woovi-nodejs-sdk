import { PageInfo } from "@src/clients/commonTypes";
import { destination, payment, transaction } from "../commonTypes";

type payments = {
    payment: payment;
    destination: destination;
    transaction: transaction;
}

export declare type ListResponse = {
    payments: payments[];
    pageInfo: PageInfo;
}