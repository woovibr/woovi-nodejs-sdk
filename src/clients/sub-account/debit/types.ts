export type DebitPayload = {
	/**
	 * Pix key registered to the subaccount.
	 *
	 * @example subaccount@test.com
	 */
	id: string;

	/**
	 * Amount to debit from the account.
	 */
	value: number;

	/**
	 * Optional description for the debit operation.
	 */
	description?: string;
};

export type DebitResponse = {
	pixKey: string;
	value: number;
	description: string;
	success: string;
};
