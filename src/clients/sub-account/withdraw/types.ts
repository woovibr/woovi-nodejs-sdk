import { SubAccount, Account } from "../commonTypes";

export  type WithDrawPayload = {
  id: string;
}

export  type WithDrawResponse = {
  withdraw: Account;
};
