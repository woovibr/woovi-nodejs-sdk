import { RestClient } from '@utils/restClient';
import approve from '.';

const unmockedFetch = global.fetch;

afterAll(() => {
	global.fetch = unmockedFetch;
});

declare let global: {
	fetch: unknown;
};

const client = RestClient({ appId: '123' });
const resource = approve(client);

test('Should get error', async () => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve({ error: 'not exists' }),
			ok: false,
			status: 400,
		}),
	);

	await expect(resource({ name: 'SOME NAME' })).rejects.toEqual({
		error: 'not exists',
	});
});

test('Should have success', async () => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () =>
				Promise.resolve({
					pixQrCode: {
						value: 100,
						comment: 'good',
						correlationID: '9134e286-6f71-427a-bf00-241681624586',
						identifier: 'zr7833b4060c488a9b0f89811',
						paymentLinkID: '7777a23s-6f71-427a-bf00-241681624586',
						paymentLinkUrl:
							'https://openpix.com.br/pay/9134e286-6f71-427a-bf00-241681624586',
						qrCodeImage:
							'https://api.openpix.com.br/openpix/pixQrCode/brcode/image/9134e286-6f71-427a-bf00-241681624586.png',
						createdAt: '2021-03-02T17:28:51.882Z',
						updatedAt: '2021-03-02T17:28:51.882Z',
						brCode:
							'000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA',
					},
				}),
			ok: true,
			status: 200,
		}),
	);

	const response = await resource({ name: 'SOME NAME' });
	expect(response).toEqual({
		pixQrCode: {
			value: 100,
			comment: 'good',
			correlationID: '9134e286-6f71-427a-bf00-241681624586',
			identifier: 'zr7833b4060c488a9b0f89811',
			paymentLinkID: '7777a23s-6f71-427a-bf00-241681624586',
			paymentLinkUrl:
				'https://openpix.com.br/pay/9134e286-6f71-427a-bf00-241681624586',
			qrCodeImage:
				'https://api.openpix.com.br/openpix/pixQrCode/brcode/image/9134e286-6f71-427a-bf00-241681624586.png',
			createdAt: '2021-03-02T17:28:51.882Z',
			updatedAt: '2021-03-02T17:28:51.882Z',
			brCode:
				'000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA',
		},
	});
});
