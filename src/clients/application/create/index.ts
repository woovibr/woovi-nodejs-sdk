import { RestClientApi } from '@utils/types';
import { CreatePayload, CreateResponse } from './types';

export default (restClient: RestClientApi) => {
  return (data: CreatePayload) =>
    restClient<CreateResponse>(
      '/api/v1/application',
      {
        method: 'POST',
      },
      data,
    );
};
