import { TaxID } from '@src/clients/commonTypes';
import { Document, Representative } from '../commonTypes';

export type GetPayload = {
  taxID: string;
};

export type UpdatePayload = {
  documents?: Document[];
  representatives?: Representative[];
  businessDescription?: string;
  businessProduct?: string;
  businessLifetime?: string;
  businessGoal?: string;
};

export type UpdateResponse = {
  officialName: string;
  tradeName: string;
  taxID: TaxID;
  status: string;
  requestedDocuments: string[];
  missingDocumentsDescription: string;
};
