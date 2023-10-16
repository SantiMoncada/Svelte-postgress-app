<script lang="ts">
	import { headerTexts } from './../../const/const';
	export let mainCheck: boolean;
	export let handleMainCheck: () => void;
</script>

<thead class="payments_list_header">
	<tr>
		<th>
			<label class="control control--checkbox">
				<input type="checkbox" bind:checked={mainCheck} on:click={handleMainCheck} />
				<div class="control__indicator" />
			</label>
		</th>
		{#each headerTexts as header}
			<th>{header.text}</th>
		{/each}
	</tr>
</thead>

<style>
	.payments_list_header > tr {
		display: grid;
		grid-template-columns: 0.2fr 2fr 2fr 1fr 0.5fr 0.5fr;
		align-items: center;
		background-color: var(--color-bg-stripe);
		padding: 0.5em 1em;
		color: var(--fonts-primary-variant);
		text-align: left;
		gap: 1em;
	}
</style>
