import type { CustomerPayload } from "@src/clients/customer/create/types";

import type { AdditionalInfo } from "@src/clients/commonTypes";
import type { Charge, Split } from "../commonTypes";

export type CreatePayload = {
  correlationID: string;
  value: number;
  type?: "DYNAMIC" | "OVERDUE";
  comment?: string;
  expiresIn?: number;
  expiresDate?: string;
  customer?: CustomerPayload;
  ensureSameTaxId?: boolean;
  daysForDueDate?: number;
  daysAfterDueDate?: number;
  interests?: {
    value: number;
  };
  fines?: {
    value: number;
  };
  discountSettings?: {
    modality:
      | "FIXED_VALUE_UNTIL_SPECIFIED_DATE"
      | "PERCENTAGE_UNTIL_SPECIFIED_DATE";
    discountFixedDate: {
      daysActive: number;
      value: number;
    }[];
  };
  additionalInfo?: AdditionalInfo[];
  enableCashbackPercentage?: boolean;
  enableCashbackExclusivePercentage?: boolean;
  subaccount?: string;
  splits?: Split[]
};

export type CreateParams = {
  return_existing?: "true" | "false";
}

export type CreateResponse = {
  charge: Charge;
};
