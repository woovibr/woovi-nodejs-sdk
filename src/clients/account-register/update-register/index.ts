import type { RestClientApi } from '@utils/types';
import type { UpdatePayload, UpdateResponse } from './types';

export default (restClient: RestClientApi) => {
  return (data: UpdatePayload, taxID: string) =>
    restClient<UpdateResponse>(
      `/api/v1/account-register/${taxID}`,
      {
        method: 'PATCH',
      },
      data,
    );
};
