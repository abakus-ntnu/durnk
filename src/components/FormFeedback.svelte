<script lang="ts">
	interface Props {
		form: {
			status: number;
			body: {
				message: string;
			};
		} | null;
	}
	let { form }: Props = $props();
</script>

{#if form}
	<h2>
		<marquee bgcolor={form.status < 300 ? 'green' : 'red'}>
			<font color="white">
				{form.body.message}
			</font>
		</marquee>
	</h2>
{/if}
