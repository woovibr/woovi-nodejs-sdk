import type { Application } from '@src/clients/commonTypes';

export type CreatePayload = {
	accountId: string;
	application: {
		name: string;
		type: 'API';
	};
};

export type CreateResponse = {
	application: Application;
};
