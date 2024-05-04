import { SubAccount } from "../commonTypes";

export  type GetPayload = {
    id: string;
}

export  type GetResponse = {
  SubAccount: SubAccount;
}