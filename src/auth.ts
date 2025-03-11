import { SvelteKitAuth } from '@auth/sveltekit';
import Authentik from '@auth/core/providers/authentik';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [Authentik],
	trustHost: true
});
