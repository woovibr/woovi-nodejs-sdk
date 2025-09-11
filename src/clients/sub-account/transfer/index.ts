import type { RestClientApi } from '@utils/types';
import type { TransferPayload } from './types';

export default (restClient: RestClientApi) => {
  return (data: TransferPayload) =>
    restClient<TransferPayload>(
      `/api/v1/subaccount/transfer`,
      { method: 'POST' },
      data,
    );
};
