<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
	import { page } from '$app/state';
	import { buyableThings } from '$lib/buyableThings';
	import FormFeedback from '../../components/FormFeedback.svelte';
	import UndoButton from '../../components/UndoButton.svelte';
	let { form } = $props();
</script>

<FormFeedback {form} />
<UndoButton {form} />

{#if page.data.session}
	<header>
		<nav>
			<table>
				<tbody>
					<tr>
						<td>
							<a href="/">
								<button>
									<p />
									Tilbake
									<p />
								</button>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</nav>
	</header>

	<h2>Fyll på i skapet:</h2>
	<form method="POST" action="?/fill">
		<label for="amount">Antall</label>
		<input size="1" type="number" name="amount" value="1" height="200" />
		<br />
		<br />
		<label for="thing">Ting</label>
		<select name="thing">
			{#each buyableThings as thing}
				<option value={thing.name}>{thing.displayName}</option>
			{/each}
		</select>
		<br />
		<br />
		<button>Submit</button>
	</form>
{:else}
	<SignIn provider="authentik">
		<span slot="submitButton">Logg inn med abakus.no</span>
	</SignIn>
{/if}
