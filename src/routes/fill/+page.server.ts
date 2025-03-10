import type { Actions } from '@sveltejs/kit';
import { type BuyableThingName, getBuyableThing } from '$lib/buyableThings';
import { addTransaction, undoTransaction } from '$lib/db';

export const actions: Actions = {
	fill: async ({ request, locals }) => {
		const auth = await locals.auth();
		if (!auth?.user?.name || !auth?.user?.email) {
			return {
				status: 401,
				body: { message: 'Unauthorized' }
			};
		}

		const formData = await request.formData();
		const amount = Number(formData.get('amount'));
		const thingName = String(formData.get('thing')) as BuyableThingName;
		const thing = getBuyableThing(thingName);

		if (amount > 50) {
			return {
				status: 400,
				body: { message: 'Liksom...' }
			};
		}

		const insertedId = await addTransaction({
			thing: thingName,
			amount: -amount,
			user: auth.user.name,
			email: auth.user.email
		});

		return {
			status: 200,
			body: {
				message: `${amount} ${thing.displayName} fylt på i kjøleskapet:)`,
				id: insertedId
			}
		};
	},
	undo: async ({ request, locals }) => {
		const auth = await locals.auth();
		if (!auth?.user?.name || !auth?.user?.email) {
			return {
				status: 401,
				body: { message: 'Unauthorized' }
			};
		}

		const formData = await request.formData();
		const id = String(formData.get('id'));

		return undoTransaction(id, auth.user.name);
	}
};
