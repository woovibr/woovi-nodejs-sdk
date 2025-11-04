import type { Address, TaxID } from '../commonTypes';

export type DocumentTypeEnum = 'SOCIAL_CONTRACT' | 'ATA' | 'BYLAWS';
export type RepresentativeDocumentTypeEnum =
  | 'CNH'
  | 'IDENTITY_FRONT'
  | 'IDENTITY_BACK'
  | 'CNH_FRONT'
  | 'CNH_BACK'
  | 'PICTURE';

export type UserTypeEnum = 'ADMIN';

export type Document = {
  url: string;
  type: DocumentTypeEnum;
};

export type RepresentativeDocument = {
  url: string;
  type: RepresentativeDocumentTypeEnum;
};

export type Representative = {
  name: string;
  documents: RepresentativeDocument[];
  phone: string;
  birthDate: string;
  email: string;
  type: UserTypeEnum;
  taxID: string;
  address: Partial<Address>;
};
