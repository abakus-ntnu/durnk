import { client } from '../mongo';
import { ObjectId } from 'mongodb';

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
		.deleteOne({
			_id: new ObjectId(id),
			user: username,
			timestamp: { $gte: new Date(Date.now() - 1000 * 60) }
		});

	if (result.deletedCount === 0) {
		return {
			status: 400,
			body: { message: 'Kunne ikke angre transaksjonen' }
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

export const getTransactions = async (username: string) => {
	return client
		.db('bull-db')
		.collection<Transaction & { _id: string; timestamp: string }>('transactions')
		.find({ user: username })
		.sort({ timestamp: -1 })
		.map(({ _id, user, email, thing, amount, timestamp }) => ({
			id: String(_id),
			user: String(user),
			email: String(email),
			thing: String(thing),
			amount: Number(amount),
			timestamp: String(timestamp)
		}))
		.toArray();
};

export const getStock = async () => {
	return (
		await client
			.db('bull-db')
			.collection<Transaction & { _id: String; timestamp: string }>('transactions')
			.find({})
			.toArray()
	).reduce((total, entry) => {
		if (!(entry.thing in total)) {
			total[entry.thing] = 0;
		}
		// Because we decided to do it the other way
		total[entry.thing] -= entry.amount;
		return total;
	}, {});
};
