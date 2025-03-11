import type { RequestHandler } from '@sveltejs/kit';
import { client } from '../../../mongo';

export const GET: RequestHandler = async ({}) => {
  // Ping DB
  const restult = await client.db('bull-db').command({ ping: 1 });
  if (!restult.ok) {
    return new Response('MongoDB failed to respond', { status: 500 });
  }
	return new Response('OK', { status: 200 });
};
