import type { LayoutServerLoad } from './$types';
import { getTransactions } from '$lib/db';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	const username = session?.user?.name;

	if (username) {
		const transactions = await getTransactions(username);
		console.log(transactions);
		return {
			session,
			transactions
		};
	}

	return {
		session
	};
};
