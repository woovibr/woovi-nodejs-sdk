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
    resource(
      {
        businessDescription: 'Technology and Financial Services',
        businessProduct: 'Digital payment solutions and banking services',
        businessLifetime: '3 years',
        businessGoal:
          'To expand digital payment capabilities and improve customer experience',
      },
      '12345678901234',
    ),
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
            code: 'invalid_type',
            expected: 'string',
            received: 'undefined',
            message: 'Representative name is required',
            path: ['representatives', 0, 'name'],
          },
        }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource(
      {
        businessDescription: 'Technology and Financial Services',
        businessProduct: 'Digital payment solutions and banking services',
        businessLifetime: '3 years',
        businessGoal:
          'To expand digital payment capabilities and improve customer experience',
      },
      '12345678901234',
    ),
  ).rejects.toEqual({
    error: {
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      message: 'Representative name is required',
      path: ['representatives', 0, 'name'],
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
    resource(
      {
        businessDescription: 'Technology and Financial Services',
        businessProduct: 'Digital payment solutions and banking services',
        businessLifetime: '3 years',
        businessGoal:
          'To expand digital payment capabilities and improve customer experience',
      },
      '12345678901234',
    ),
  ).rejects.toEqual({
    error: 'Invalid Authorization header',
  });
});

test('Should get error 400 - AccountRegisterIDRequired', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          error: 'Account register ID is required',
        }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource(
      {
        businessDescription: 'Technology and Financial Services',
        businessProduct: 'Digital payment solutions and banking services',
        businessLifetime: '3 years',
        businessGoal:
          'To expand digital payment capabilities and improve customer experience',
      },
      '',
    ),
  ).rejects.toEqual({
    error: 'Account register ID is required',
  });
});

test('Should get error 400 - CannotUpdateStatus', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          error:
            'Cannot update account register in current status',
        }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource(
      {
        businessDescription: 'Technology and Financial Services',
        businessProduct: 'Digital payment solutions and banking services',
        businessLifetime: '3 years',
        businessGoal:
          'To expand digital payment capabilities and improve customer experience',
      },
      '12345678901234',
    ),
  ).rejects.toEqual({
    error:
      'Cannot update account register in current status',
  });
});

test('Should get error 400 - ProtectedFields', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          error:
            'Cannot update fields: officialName, tradeName, taxID, billingAddress',
        }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource(
      {
        businessDescription: 'Technology and Financial Services',
        businessProduct: 'Digital payment solutions and banking services',
        businessLifetime: '3 years',
        businessGoal:
          'To expand digital payment capabilities and improve customer experience',
      },
      '12345678901234',
    ),
  ).rejects.toEqual({
    error:
      'Cannot update fields: officialName, tradeName, taxID, billingAddress',
  });
});

test('Should get error 404 - CompanyNotFound', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          error:
            'Company not found',
        }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource(
      {
        businessDescription: 'Technology and Financial Services',
        businessProduct: 'Digital payment solutions and banking services',
        businessLifetime: '3 years',
        businessGoal:
          'To expand digital payment capabilities and improve customer experience',
      },
      '12345678901234',
    ),
  ).rejects.toEqual({
    error:
      'Company not found',
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
    resource(
      {
        businessDescription: 'Technology and Financial Services',
        businessProduct: 'Digital payment solutions and banking services',
        businessLifetime: '3 years',
        businessGoal:
          'To expand digital payment capabilities and improve customer experience',
      },
      '12345678901234',
    ),
  ).rejects.toEqual({
    error: 'Internal server error',
  });
});
