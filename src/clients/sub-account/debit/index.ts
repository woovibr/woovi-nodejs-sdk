import type { RestClientApi } from '@utils/types';
import type { DebitPayload } from './types';

export default (restClient: RestClientApi) => {
	return ({ id, ...data }: DebitPayload) =>
		restClient<DebitPayload>(
			`/api/v1/subaccount/${id}/debit`,
			{ method: 'POST' },
			data,
		);
};
