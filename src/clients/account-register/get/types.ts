import type { TaxID } from '@src/clients/commonTypes';

export type GetPayload = {
  taxID: string;
};

export type GetResponse = {
  officialName: number;
  tradeName: string;
  type: string;
  taxID: TaxID;
  status: string;
};
