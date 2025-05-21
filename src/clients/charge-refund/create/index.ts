import type { RestClientApi } from '@utils/types';
import type { CreatePayload, CreateResponse } from './types';

export default (restClient: RestClientApi) => {
  return ({ chargeId, ...data }: CreatePayload) =>
    restClient<CreateResponse>(
      `/api/v1/charge/${chargeId}/refund`,
      { method: 'POST' },
      data,
    );
};
