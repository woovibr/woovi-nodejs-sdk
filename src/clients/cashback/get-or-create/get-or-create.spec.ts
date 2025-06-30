import { RestClient } from '@utils/restClient';
import getOrCreate from '.';

const unmockedFetch = global.fetch;

afterAll(() => {
	global.fetch = unmockedFetch;
});

declare let global: {
	fetch: unknown;
};

const client = RestClient({ appId: '123' });
const resource = getOrCreate(client);

test('Should get error', async () => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve({ error: 'not exists' }),
			ok: false,
			status: 400,
		}),
	);

	await expect(
		resource({
			taxID: '12345678911',
			value: 100,
		}),
	).rejects.toEqual({
		error: 'not exists',
	});
});

test('Should have success', async () => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () =>
				Promise.resolve({
					cashback: {
						value: 100,
					},
					message: 'string',
				}),
			ok: true,
			status: 200,
		}),
	);

	const response = await resource({
		taxID: '12345678911',
		value: 100,
	});

	expect(response).toEqual({
		cashback: {
			value: 100,
		},
		message: 'string',
	});
});
