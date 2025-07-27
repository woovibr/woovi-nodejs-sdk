import {
  type AdditionalInfo,
  type BasicCustomer,
  Customer,
} from "@src/clients/commonTypes";
import type { Subscription } from "../commonTypes";

export type CreatePayload = {
  customer: BasicCustomer;
  value: number;
  additionalInfo?: AdditionalInfo[];
  dayGenerateCharge: number;
  chargeType?: "DYNAMIC" | "OVERDUE";
  frequency?: "WEEKLY" | "MONTHLY" | "BIMONTHLY" | "TRIMONTHLY" | "SEMIANNUALY" | "ANNUALY";
  dayDue?: number;
};

export type CreateResponse = {
  subscription: Subscription;
};
