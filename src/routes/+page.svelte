<script lang="ts">
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/state';
	import { buyableThings, getBuyableThing } from '$lib/buyableThings';
	import FormFeedback from '../components/FormFeedback.svelte';
	import UndoButton from '../components/UndoButton.svelte';
	let { form } = $props();
	const transactions = (page.data?.transactions || []).map((transaction) => ({
		...transaction,
		thing: getBuyableThing(transaction.thing)
	}));
	const totals = transactions.reduce(
		(acc, transaction) => ({
			...acc,
			[transaction.name]: {
				...acc[transaction.name],
				thing: transaction.thing,
				amount: (acc[transaction.name]?.amount ?? 0) + transaction.amount
			}
		}),
		{}
	);
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
				{thing.displayName}: {page.data.stock[thing.name] || 0}
			</button>
		</form>
		<br />
	{/each}
	<br />

	<h2>Dine kjøp/påfyll</h2>
	{#if transactions.length === 0}
		<p>Du har ikke kjøpt noe enda.</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Ting</th>
					<th>Pris</th>
					<th>Mengde</th>
					<th>Tidspunkt</th>
				</tr>
			</thead>
			<tbody>
				{#each transactions as transaction}
					<tr>
						<td>{transaction.thing.displayName}</td>
						<td>{transaction.thing.price}</td>
						<td>{transaction.amount}</td>
						<td>{transaction.timestamp}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<h2>Samlet oversikt</h2>
		<table>
			<thead>
				<tr>
					<th>Ting</th>
					<th>Pris</th>
					<th>Kjøpt</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.values(totals) as total}
					<tr>
						<td>{total.thing.displayName}</td>
						<td>{total.thing.price}</td>
						<td>{total.amount}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
{:else}
	<SignIn provider="authentik">
		<p />
		<span slot="submitButton">Logg inn med abakus.no</span>
		<p />
	</SignIn>
{/if}
