import type { TaxID, Address } from '@src/clients/commonTypes';
import type { Document, Representative } from '../commonTypes';
import type { PartiallyOptional } from '@utils/types';

export type CreatePayload = {
  officialName: string;
  tradeName: string;
  taxID: string;
  billingAddress: PartiallyOptional<Address, 'complement' | 'country'>;
  documents?: Document[];
  representatives?: Representative[];
  businessDescription?: string;
  businessProduct?: string;
  businessLifetime?: string;
  businessGoal?: string;
};

export type CreateResponse = {
  officialName: string;
  tradeName: string;
  taxID: TaxID;
  status: string;
  requestedDocuments: string[];
  missingDocumentsDescription: string;
};
