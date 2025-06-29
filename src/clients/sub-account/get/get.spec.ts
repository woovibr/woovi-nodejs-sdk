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

	await expect(resource({ id: 'some_id' })).rejects.toEqual({
		error: 'not exists',
	});
});

test('Should have success', async () => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () =>
				Promise.resolve({
					SubAccount: {
						name: 'test-sub-account',
						pixKey: 'c4249323-b4ca-43f2-8139-8232aab09b93',
						balance: 100,
					},
				}),
			ok: true,
			status: 200,
		}),
	);

	const response = await resource({ id: 'some_id' });
	expect(response).toEqual({
		SubAccount: {
			name: 'test-sub-account',
			pixKey: 'c4249323-b4ca-43f2-8139-8232aab09b93',
			balance: 100,
		},
	});
});
