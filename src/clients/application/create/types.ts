export type CreatePayload = {
  accountId: string;
  application: {
    name: string;
    type: string;
  };
};

export type CreateResponse = {
  application: Application;
};

export type Application = {
  name: string;
  isActive: boolean;
  type: string;
  clientId: string;
  clientSecret: string;
  appID: string;
  companyBankAccount: string;
};
