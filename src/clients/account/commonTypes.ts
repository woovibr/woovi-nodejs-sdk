export type Account = {
  accountId: string;
  isDefault: boolean;
  balance: {
    total: number;
    blocked: number;
    available: number;
  };
  taxId: string;
  officialName: string;
  tradeName: string;
  branch: string;
  account: string
};