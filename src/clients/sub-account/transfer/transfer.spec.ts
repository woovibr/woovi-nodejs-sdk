import { RestClient } from '@utils/restClient';
import create from '.';

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare let global: {
  fetch: unknown;
};

const client = RestClient({ appId: '123' });
const resource = create(client);

const transferPayloadFixture = {
  fromPixKey: 'example-1@example.com',
  fromPixKeyType: 'EMAIL',
  toPixKey: 'example-2@example.com',
  toPixKeyType: 'EMAIL',
  value: 1000,
} as const;

test('Should get error', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ error: 'not exists' }),
      ok: false,
      status: 400,
    }),
  );

  await expect(resource(transferPayloadFixture)).rejects.toEqual({
    error: 'not exists',
  });
});

test('Should have success', async () => {
  const mockedResponse = {
    value: 1000,
    destinationSubaccount: {
      name: 'example-1',
      pixKey: 'example-1@example.com',
      balance: 1000,
    },
    originSubaccount: {
      name: 'example-2',
      pixKey: 'example-2@example.com',
      balance: 1000,
    },
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockedResponse),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource(transferPayloadFixture);

  expect(response).toEqual(mockedResponse);
});
