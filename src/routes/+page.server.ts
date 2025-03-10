import type { Actions } from '@sveltejs/kit';
import { buyableThings } from '$lib/buyableThings';
import { addTransaction, undoTransaction } from '$lib/db';

export const actions: Actions = {
	take: async ({ request, locals }) => {
		const auth = await locals.auth();
		if (!auth?.user?.name || !auth?.user?.email) {
			return {
				status: 401,
				body: { message: 'Unauthorized' }
			};
		}

		const formData = await request.formData();
		const thingName = String(formData.get('thing'));
		const thing = buyableThings.find((thing) => thing.name === thingName)!;
		const insertedId = await addTransaction({
			thing: thingName,
			amount: 1,
			user: auth.user.name,
			email: auth.user.email
		});

		return {
			status: 200,
			body: {
				message: `1 ${thing.displayName} tatt fra kjøleskapet:)`,
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
