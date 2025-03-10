<script lang="ts">
	interface Props {
		form: {
			status: number;
			body:
				| {
						id: string;
				  }
				| Record<string, unknown>;
		} | null;
	}

	const { form }: Props = $props();
	const formSuccess = form && form.status < 300;
</script>

{#if formSuccess && 'id' in form.body}
	<form method="POST" action="?/undo">
		<input type="hidden" name="id" value={form.body.id} />
		<button>Angre</button>
	</form>
{/if}
