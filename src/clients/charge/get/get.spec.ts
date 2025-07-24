import { RestClient } from "@utils/restClient";
import get from ".";

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

declare let global: {
  fetch: unknown;
};

const client = RestClient({ appId: "123" });
const resource = get(client);

test("Should get error", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ error: "not exists" }),
      ok: false,
      status: 400,
    }),
  );

  await expect(resource({ id: "some_id" })).rejects.toEqual({
    error: "not exists",
  });
});

test("Should have success", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          charge,
        }),
      ok: true,
      status: 200,
    }),
  );

  const charge = {
    status: "ACTIVE",
    customer: {
      name: "Dan",
      email: "email0@example.com",
      phone: "5511999999999",
      taxID: {
        taxID: "31324227036",
        type: "BR:CPF",
      },
    },
    value: 100,
    comment: "good",
    correlationID: "9134e286-6f71-427a-bf00-241681624586",
    paymentLinkID: "7777-6f71-427a-bf00-241681624586",
    paymentLinkUrl:
      "https://openpix.com.br/pay/9134e286-6f71-427a-bf00-241681624586",
    globalID: "Q2hhcmdlOjcxOTFmMWIwMjA0NmJmNWY1M2RjZmEwYg==",
    qrCodeImage:
      "https://api.openpix.com.br/openpix/charge/brcode/image/9134e286-6f71-427a-bf00-241681624586.png",
    brCode:
      "000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA",
    additionalInfo: [
      {
        key: "Product",
        value: "Pencil",
      },
      {
        key: "Invoice",
        value: "18476",
      },
      {
        key: "Order",
        value: "302",
      },
    ],
    expiresIn: 2592000,
    expiresDate: "2021-04-01T17:28:51.882Z",
    createdAt: "2021-03-02T17:28:51.882Z",
    updatedAt: "2021-03-02T17:28:51.882Z",
  };

  const response = await resource({
    id: "9134e286-6f71-427a-bf00-241681624586",
  });
  expect(response).toEqual({
    charge,
  });
});

test("Should have success for charge batch by id (buffer mode)", async () => {
  const charges = [
    {
      status: "ACTIVE",
      customer: {
        name: "Dan",
        email: "email0@example.com",
        phone: "5511999999999",
        taxID: {
          taxID: "31324227036",
          type: "BR:CPF",
        },
      },
      value: 100,
      comment: "good",
      correlationID: "9134e286-6f71-427a-bf00-241681624586",
      paymentLinkID: "7777-6f71-427a-bf00-241681624586",
      paymentLinkUrl:
        "https://openpix.com.br/pay/9134e286-6f71-427a-bf00-241681624586",
      globalID: "Q2hhcmdlOjcxOTFmMWIwMjA0NmJmNWY1M2RjZmEwYg==",
      qrCodeImage:
        "https://api.openpix.com.br/openpix/charge/brcode/image/9134e286-6f71-427a-bf00-241681624586.png",
      brCode:
        "000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA",
      additionalInfo: [
        {
          key: "Product",
          value: "Pencil",
        },
        {
          key: "Invoice",
          value: "18476",
        },
        {
          key: "Order",
          value: "302",
        },
      ],
      expiresIn: 2592000,
      expiresDate: "2021-04-01T17:28:51.882Z",
      createdAt: "2021-03-02T17:28:51.882Z",
      updatedAt: "2021-03-02T17:28:51.882Z",
    },
    {
      status: "PAID",
      customer: {
        name: "Jane",
        email: "email1@example.com",
        phone: "5511888888888",
        taxID: {
          taxID: "12345678901",
          type: "BR:CPF",
        },
      },
      value: 200,
      comment: "great",
      correlationID: "b234e286-6f71-427a-bf00-241681624587",
      paymentLinkID: "8888-6f71-427a-bf00-241681624587",
      paymentLinkUrl:
        "https://openpix.com.br/pay/b234e286-6f71-427a-bf00-241681624587",
      globalID: "Q2hhcmdlOjcxOTFmMWIwMjA0NmJmNWY1M2RjZmEwYg==",
      qrCodeImage:
        "https://api.openpix.com.br/openpix/charge/brcode/image/b234e286-6f71-427a-bf00-241681624587.png",
      brCode:
        "000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=1234567890abcdef1234567890abcdef52040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA",
      additionalInfo: [
        {
          key: "Product",
          value: "Pen",
        },
        {
          key: "Invoice",
          value: "18477",
        },
        {
          key: "Order",
          value: "303",
        },
      ],
      expiresIn: 2592000,
      expiresDate: "2021-05-01T17:28:51.882Z",
      createdAt: "2021-04-02T17:28:51.882Z",
      updatedAt: "2021-04-02T17:28:51.882Z",
    },
  ];

  // Mock fetch to return each charge in order
  let call = 0;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ charge: charges[call++] }),
      ok: true,
      status: 200,
    }),
  );

  const response = await resource({
    id: [
      "9134e286-6f71-427a-bf00-241681624586",
      "b234e286-6f71-427a-bf00-241681624587",
    ],

  });

  expect(response).toEqual({
    charge: charges,
  });
});

test("Should have success for charge batch by id (stream mode, 10 items, 200ms delay)", async () => {
    const charges = Array.from({ length: 10 }).map((_, i) => ({
      status: i % 2 === 0 ? "ACTIVE" : "PAID",
      customer: {
        name: `Customer${i}`,
        email: `email${i}@example.com`,
        phone: `55119999999${i}${i}`,
        taxID: {
          taxID: `3132422703${i}`,
          type: "BR:CPF",
        },
      },
      value: 100 + i,
      comment: `comment${i}`,
      correlationID: `${i}134e286-6f71-427a-bf00-24168162458${i}`,
      paymentLinkID: `${7777 + i}-6f71-427a-bf00-24168162458${i}`,
      paymentLinkUrl: `https://openpix.com.br/pay/${i}134e286-6f71-427a-bf00-24168162458${i}`,
      globalID: `Q2hhcmdlOjcxOTFmMWIwMjA0NmJmNWY1M2RjZmEwYg==`,
      qrCodeImage: `https://api.openpix.com.br/openpix/charge/brcode/image/${i}134e286-6f71-427a-bf00-24168162458${i}.png`,
      brCode: `000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=${i}67ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA`,
      additionalInfo: [
        { key: "Product", value: `Product${i}` },
        { key: "Invoice", value: `1847${i}` },
        { key: "Order", value: `30${i}` },
      ],
      expiresIn: 2592000,
      expiresDate: `2021-0${i + 1}-01T17:28:51.882Z`,
      createdAt: `2021-0${i + 1}-02T17:28:51.882Z`,
      updatedAt: `2021-0${i + 1}-02T17:28:51.882Z`,
    }));

    let call = 0;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ charge: charges[call++] }),
        ok: true,
        status: 200,
      }),
    );

    // Simulate stream mode: resource returns an async generator
    // We'll assume resource({ id: [...], stream: true, delay: 200 }) yields each charge with delay
    const ids = charges.map((_, i) => `${i}134e286-6f71-427a-bf00-24168162458${i}`);
    const start = Date.now();
    const received: any[] = [];
    
    await resource({ 
      id: ids, 
      mode: "stream", 
      chunkRoundDelayInMs: 200,
      maxChunkSize: 5,
      onData: (data) => {
        received.push(data);
      },
    });

    const elapsed = Date.now() - start;

    expect(received).toEqual(charges);

    // Here it is okay to assume that the operation, with the provided data, will take less
    // than 600ms to complete as we are simulating a delay of 200ms per chunk and want the
    // tasks to complete in less than 100ms. In real scenarios, this might vary based on network
    // and server conditions, but for testing purposes, we can set a performance threshold.
    expect(elapsed).toBeLessThanOrEqual(600);
});