import { RestClient } from '@utils/restClient';
import createRegister from '.';

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare let global: {
  fetch: unknown;
};

const client = RestClient({ appId: '123' });
const resource = createRegister(client);

test('Should have success', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          officialName: 'Company Official Name',
          tradeName: 'string',
          taxID: {
            taxID: '12345678901234',
          },
          status: 'PENDING',
          requestedDocuments: ['string'],
          missingDocumentsDescription: 'string',
        }),
      ok: true,
      status: 200,
    }),
  );

  await expect(
    resource({
      officialName: 'Company Official Name',
      tradeName: 'Company Trade Name',
      taxID: '12345678901234',
      billingAddress: {
        zipcode: '12345678',
        street: 'Test Street',
        number: '123',
        neighborhood: 'Test Neighborhood',
        city: 'Test City',
        state: 'TS',
      },
    }),
  ).resolves.toEqual({
    officialName: 'Company Official Name',
    tradeName: 'string',
    taxID: { taxID: '12345678901234' },
    status: 'PENDING',
    requestedDocuments: ['string'],
    missingDocumentsDescription: 'string',
  });
});

test('Should get error 400 - ValidationError', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          error: {
            code: 'too_small',
            minimum: 1,
            type: 'string',
            inclusive: true,
            message: 'Official name is required',
            path: ['officialName'],
          },
        }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource({
      officialName: '',
      tradeName: 'Company Trade Name',
      taxID: '12345678901234',
      billingAddress: {
        zipcode: '12345678',
        street: 'Test Street',
        number: '123',
        neighborhood: 'Test Neighborhood',
        city: 'Test City',
        state: 'TS',
      },
    }),
  ).rejects.toEqual({
    error: {
      code: 'too_small',
      minimum: 1,
      type: 'string',
      inclusive: true,
      message: 'Official name is required',
      path: ['officialName'],
    },
  });
});

test('Should get error 400 - MissingAuthorization', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          error: 'Invalid Authorization header',
        }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource({
      officialName: 'Company Official Name',
      tradeName: 'Company Trade Name',
      taxID: '12345678901234',
      billingAddress: {
        zipcode: '12345678',
        street: 'Test Street',
        number: '123',
        neighborhood: 'Test Neighborhood',
        city: 'Test City',
        state: 'TS',
      },
    }),
  ).rejects.toEqual({
    error: 'Invalid Authorization header',
  });
});

test('Should get error 400 - CompanyNotFound', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          error: 'Company not found',
        }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource({
      officialName: 'Company Official Name',
      tradeName: 'Company Trade Name',
      taxID: '12345678901234',
      billingAddress: {
        zipcode: '12345678',
        street: 'Test Street',
        number: '123',
        neighborhood: 'Test Neighborhood',
        city: 'Test City',
        state: 'TS',
      },
    }),
  ).rejects.toEqual({
    error: 'Company not found',
  });
});

test('Should get error 403 - ForbidenAction', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          error:
            'This feature is not enabled for your company. Contact us to active.',
        }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource({
      officialName: 'Company Official Name',
      tradeName: 'Company Trade Name',
      taxID: '12345678901234',
      billingAddress: {
        zipcode: '12345678',
        street: 'Test Street',
        number: '123',
        neighborhood: 'Test Neighborhood',
        city: 'Test City',
        state: 'TS',
      },
    }),
  ).rejects.toEqual({
    error:
      'This feature is not enabled for your company. Contact us to active.',
  });
});

test('Should get error 500 - InternalServerError', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          error: 'Internal server error',
        }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource({
      officialName: 'Company Official Name',
      tradeName: 'Company Trade Name',
      taxID: '12345678901234',
      billingAddress: {
        zipcode: '12345678',
        street: 'Test Street',
        number: '123',
        neighborhood: 'Test Neighborhood',
        city: 'Test City',
        state: 'TS',
      },
    }),
  ).rejects.toEqual({
    error: 'Internal server error',
  });
});
