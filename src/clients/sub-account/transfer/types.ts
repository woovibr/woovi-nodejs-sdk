import type { PixKeyType } from '@src/clients/commonTypes';
import type { SubAccount } from '../commonTypes';

export type TransferPayload = {
  /**
   * The value of transfer in cents.
   */
  value: number;

  /**
   * The transfer origin pix key.
   */
  fromPixKey: string;

  /**
   * The transfer origin pix key type.
   */
  fromPixKeyType: PixKeyType;

  /**
   * The transfer destination pix key.
   */
  toPixKey: string;

  /**
   * The transfer origin pix key type.
   */
  toPixKeyType: PixKeyType;

  /**
   * Your correlation ID to keep track of this transfer.
   */
  correlationID?: string;
};

export type TransferResponse = {
  /**
   * The value of the transfer in cents.
   */
  value: number;

  /**
   * The origin subaccount.
   */
  originSubaccount: SubAccount;

  /**
   * The destination subaccount.
   */
  destinationSubaccount: SubAccount;
};
