<script lang="ts">
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/state';
	import { buyableThings } from '$lib/buyableThings';
	import FormFeedback from '../components/FormFeedback.svelte';
	import UndoButton from '../components/UndoButton.svelte';
	let { form } = $props();
</script>

<FormFeedback {form} />
<UndoButton {form} />
{#if page.data.session}
	<header>
		<h1>Velkommen {page.data.session?.user?.name}!</h1>
		<p>{page.data.session?.user?.email}</p>
		<nav>
			<table>
				<tbody>
					<tr>
						<td>
							<SignOut>
								<span slot="submitButton"
									><p />
									Logg ut
									<p /></span
								>
							</SignOut>
						</td>
						<td>
							<a href="/fill">
								<button>
									<p />
									Fyll på
									<p />
								</button>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</nav>
	</header>

	<h2>Ta fra skapet:</h2>
	{#each buyableThings as thing}
		<form method="POST" action="?/take">
			<input name="thing" value={thing.name} type="hidden" />
			<button>
				<img src={thing.image} alt={thing.displayName} height="200" />
				<br />
				{thing.displayName}
			</button>
		</form>
		<br />
	{/each}
{:else}
	<SignIn provider="authentik">
		<p />
		<span slot="submitButton">Logg inn med abakus.no</span>
		<p />
	</SignIn>
{/if}
