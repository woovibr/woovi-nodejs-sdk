import type { BasicCustomer } from '@src/clients/commonTypes';
import type { Charge } from '@src/clients/transactions/commonTypes';

export type WebhooksHandler = {
	config: WebhookRegistrationConfig;
	POST: (req: Request) => Promise<Response>;
};

type Raw = {
	endToEndId: string;
	txid: string;
	valor: string;
	horario: string;
	infoPagador: string;
};

type PixQrCode = {
	name: string;
	value: string;
	comment: string;
	brCode: string;
	correlationID: string;
	paymentLinkID: string;
	paymentLinkUrl: any;
	qrCodeImage: any;
	createdAt: string;
	updatedAt: string;
};

type Pix = {
	pixQrCode?: PixQrCode;
	charge: Charge;
	customer: BasicCustomer;
	payer: BasicCustomer;
	time: string;
	value: string;
	transactionID: string;
	infoPagador: string;
	raw: Raw;
};

type Payment = {
	status: string;
	value: number;
	destinationAlias: string;
	correlationID: string;
};

type Transaction = {
	correlationID: string;
	value: number;
	endToEndId: string;
	time: string;
};

type ChargePayload = {
	charge: ChargePayload;
	pix: Pix;
	pixQrCode?: PixQrCode;
};

type TransactionPayload = {
	charge?: ChargePayload;
	pix: Pix;
};

type MovementPayload = {
	charge?: ChargePayload;
	pix?: Pix;
	payment?: Payment;
	transaction?: Transaction;
};

type ChargeCreatedPayload = { event: 'OPENPIX:CHARGE_CREATED' } & ChargePayload;
type ChargeCompletedPayload = {
	event: 'OPENPIX:CHARGE_COMPLETED';
} & ChargePayload;
type ChargeExpiredPayload = { event: 'OPENPIX:CHARGE_EXPIRED' } & ChargePayload;

type TransactionReceivedPayload = {
	event: 'OPENPIX:TRANSACTION_RECEIVED';
} & TransactionPayload;
type TransactionRefundReceivedPayload = {
	event: 'OPENPIX:TRANSACTION_REFUND_RECEIVED';
} & TransactionPayload;

type MovementConfirmedPayload = {
	event: 'OPENPIX:MOVEMENT_CONFIRMED';
} & MovementPayload;
type MovementFailedPayload = {
	event: 'OPENPIX:MOVEMENT_FAILED';
} & MovementPayload;
type MovementRemovedPayload = {
	event: 'OPENPIX:MOVEMENT_REMOVED';
} & MovementPayload;

export type WebhookPayload =
	| ChargeCreatedPayload
	| ChargeCompletedPayload
	| ChargeExpiredPayload
	| TransactionReceivedPayload
	| TransactionRefundReceivedPayload
	| MovementConfirmedPayload
	| MovementFailedPayload
	| MovementRemovedPayload;

export type HandlerFn<T> = (
	payload: T,
) => Promise<undefined | Response> | undefined | Response;

export type VerifyPayloadType = {
	payload: string;
	signature: string;
};

export type WebhookRegistrationConfig = {
	onChargeCreated?: HandlerFn<ChargeCreatedPayload>;
	onChargeCompleted?: HandlerFn<ChargeCompletedPayload>;
	onChargeExpired?: HandlerFn<ChargeExpiredPayload>;
	onTransactionReceived?: HandlerFn<TransactionReceivedPayload>;
	onTransactionRefundReceived?: HandlerFn<TransactionRefundReceivedPayload>;
	onMovementConfirmed?: HandlerFn<MovementConfirmedPayload>;
	onMovementFailed?: HandlerFn<MovementFailedPayload>;
	onMovementRemoved?: HandlerFn<MovementRemovedPayload>;
};
