import { client } from '../mongo';
import type { Actions } from '@sveltejs/kit';
import { buyableThings } from '$lib/buyableThings';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const auth = await locals.auth();
		if (!auth?.user?.name) {
			return {
				status: 401,
				body: { message: 'Unauthorized' }
			};
		}

		const formData = await request.formData();
		const thingName = formData.get('thing');
		const thing = buyableThings.find((thing) => thing.name === thingName);
		await client.db('bull-db').collection('transactions').insertOne({
			thing: thingName,
			amount: 1,
			user: auth.user.name,
			email: auth.user.email,
			phone: auth.user.phone
		});

		return {
			status: 200,
			body: { message: `1 ${thing.displayName} tatt fra kjøleskapet:)` }
		};
	}
};
