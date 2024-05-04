import { AdditionalInfo, BasicCustomer, Customer } from "@src/clients/commonTypes";
import { Subscription } from "../commonTypes";

export  type CreatePayload = {
  customer: BasicCustomer;
  value: number;
  additionalInfo?: AdditionalInfo[];
  dayGenerateCharge: number;
  chargeType?: "DYNAMIC" | "OVERDUE";
  dayDue?: number;
} 

export  type CreateResponse = {
  subscription: Subscription;
};
