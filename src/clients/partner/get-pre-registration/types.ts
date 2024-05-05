import { PreRegistration } from "../commonTypes";

export type GetPayload = {
  taxID: string;
};

export type GetResponse = {
  preRegistration: PreRegistration;
};
