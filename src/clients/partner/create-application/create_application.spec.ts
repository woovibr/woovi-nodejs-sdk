import { RestClient } from "@utils/restClient";
import create from ".";

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare let global: {
  fetch: unknown;
};

const client = RestClient({ appId: "123" });
const resource = create(client);

test("Should get error", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ error: "not exists" }),
      ok: false,
      status: 400,
    }),
  );

  await expect(
    resource({
      application: {
        name: "MyAPIAccess",
        type: "API",
      },
      taxID: {
        taxID: "65914571000187",
        type: "BR:CNPJ",
      },
    }),
  ).rejects.toEqual({
    error: "not exists",
  });
});

test("Should have success", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          application: {
            name: "string",
            isActive: true,
            type: "API",
            clientId: "string",
            clientSecret: "string",
          },
        }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    application: {
      name: "MyAPIAccess",
      type: "API",
    },
    taxID: {
      taxID: "65914571000187",
      type: "BR:CNPJ",
    },
  });

  expect(response).toEqual({
    application: {
      name: "string",
      isActive: true,
      type: "API",
      clientId: "string",
      clientSecret: "string",
    },
  });
});
