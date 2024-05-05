import { RequireAtLeastOne } from "@utils/types";
import { Address, Customer } from "../commonTypes";

export type CustomerPayload = {
  name: string;
  address?: Partial<Address>;
} & RequireAtLeastOne<{
  email?: string;
  taxID?: string;
  phone?: string;
}>;

export type CreateResponse = {
  customer: Customer;
};
