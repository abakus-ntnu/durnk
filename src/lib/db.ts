import { client } from '../mongo';
import { ObjectId } from 'mongodb';
import type { Session } from '@auth/core/types';

interface Transaction {
	thing: string;
	amount: number;
	user: string;
	email: string;
}

export const addTransaction = async (transaction: Transaction) => {
	const result = await client
		.db('bull-db')
		.collection('transactions')
		.insertOne({ ...transaction, timestamp: new Date() });
	return String(result.insertedId);
};

export const undoTransaction = async (id: string, username: string) => {
	const result = await client
		.db('bull-db')
		.collection('transactions')
		.findOne({ _id: new ObjectId(id) });

	if (!result) {
		return {
			status: 404,
			body: { message: 'Fant ikke transaksjonen' }
		};
	}
	if (result.user !== username) {
		return {
			status: 403,
			body: { message: 'Du har ikke tilgang til denne transaksjonen' }
		};
	}
	if (result.timestamp < new Date(Date.now() - 1000 * 60)) {
		return {
			status: 403,
			body: { message: 'Du kan ikke angre transaksjoner som er eldre enn 1 minutt' }
		};
	}

	await client
		.db('bull-db')
		.collection('transactions')
		.deleteOne({ _id: new ObjectId(id) });

	return {
		status: 200,
		body: { message: 'Angring vellykket' }
	};
};
