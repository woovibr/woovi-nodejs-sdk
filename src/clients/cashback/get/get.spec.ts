import { RestClient } from '@utils/restClient';
import get from '.';

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare let global: {
  fetch: unknown;
};

const client = RestClient({ appId: '123' });
const resource = get(client);

test('Should get error', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ error: 'not exists' }),
      ok: false,
      status: 400,
    }),
  );

  await expect(resource({ taxID: '12345678911' })).rejects.toEqual({
    error: 'not exists',
  });
});

test('Should have success', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          officialName: 100,
          tradeName: 'COMPLETED',
          type: 'COMPLETED',
          status: 'COMPLETED',
          taxID: {
            taxID: '12345678911',
            type: 'COMPLETED',
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({ taxID: '12345678911' });
  expect(response).toEqual({
    officialName: 100,
    tradeName: 'COMPLETED',
    type: 'COMPLETED',
    status: 'COMPLETED',
    taxID: {
      taxID: '12345678911',
      type: 'COMPLETED',
    },
  });
});
