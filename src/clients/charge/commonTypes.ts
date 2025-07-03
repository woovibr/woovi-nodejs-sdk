import type { BasicCustomer } from "../commonTypes";
import { PixQRCode } from "../pix-qr-code/commonTypes";

export interface Charge {
  value: number;
  customer: BasicCustomer;
  type: "DYNAMIC" | "OVERDUE";
  comment?: string;
  brCode?: string;
  status?: "ACTIVE" | "COMPLETED" | "EXPIRED";
  fee?: number;
  expiresDate?: string;
  correlationID: string;
  paymentLinkID?: string;
  paymentLinkUrl?: string;
  globalID?: string;
  transactionID?: string;
  identifier?: string;
  qrCodeImage?: string;
  additionalInfo?: {
    key: string;
    value: string;
  }[];
  pixKey?: string;
  createdAt?: string;
  updatedAt?: string;
  expiresIn?: string;
  splits?: {
    sourceAccount?: string;
    pixKeyType?: "CPF" | "CNPJ" | "EMAIL" | "PHONE" | "EVP";
  }[] & Split[];
  paymentMethods?: {
    pix?: Pix;
  }
}

export interface Pix {
  method: string;
  txId: string;
  value: number;
  status: string;
  fee: number;
  brCode: string;
  transactionID: string;
  identifier: string;
  qrCodeImage: string;
}

export interface Split {
  value: number;
  pixKey: string;
  splitType: "SPLIT_INTERNAL_TRANSFER" | "SPLIT_SUB_ACCOUNT" | "SPLIT_PARTNER";
}
