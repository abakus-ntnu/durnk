import { client } from '../../mongo';
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
		const amount = Number(formData.get('amount'));
		const thingName = formData.get('thing');
		const thing = buyableThings.find((thing) => thing.name === thingName)!;

		if (amount > 50) {
			return {
				status: 400,
				body: { message: 'Liksom...' }
			};
		}

		await client.db('bull-db').collection('transactions').insertOne({
			thing: thingName,
			amount: -amount,
			user: auth.user.name,
			email: auth.user.email,
			phone: auth.user.phone
		});

		return {
			status: 200,
			body: { message: `${amount} ${thing.displayName} fylt på i kjøleskapet:)` }
		};
	}
};
