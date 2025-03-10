import { connect } from './mongo';
export { handle, signIn, signOut } from './auth';

// Connect to MongoDB before starting the server
connect()
	.then((): void => {
		console.log('MongoDB started');
	})
	.catch((e) => {
		console.log('MongoDB failed to start');
		console.log(e);
	});
