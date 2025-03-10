import type { LayoutServerLoad } from './$types';
import { getStock, getTransactions } from '$lib/db';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	const username = session?.user?.name;

	const stock = await getStock();

	if (username) {
		const transactions = await getTransactions(username);
		console.log(transactions);
		return {
			session,
			stock,
			transactions
		};
	}

	return {
		session,
		stock
	};
};
