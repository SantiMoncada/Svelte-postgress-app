<script lang="ts">
	import { onMount } from 'svelte';
	import Filter from './filter.svelte';
	import THead from './thead.svelte';
	import LeftArrow from './../../assets/leftArrow.svelte';
	import RightArrow from './../../assets/rightArrow.svelte';
	import { toggleCheck, fetchData, nextPage } from './utils';
	import type { PaymentData } from './types';

	let payments: PaymentData[] = [];
	let totalPayments: number = 0;
	let mainCheck = false;
	let rowPerPage = 10;
	let currentPage: number = 0;

	onMount(async () => {
		handeFechData();
	});

	const handeFechData = async () => {
		const data = await fetchData(currentPage, rowPerPage);
		if (data) {
			[payments, totalPayments] = data;
		}
	};

	const handleCheck = (id: number) => {
		toggleCheck(id, mainCheck, payments);
	};

	const handleMainCheck = () => {
		mainCheck = !mainCheck;
		for (const payment of payments) {
			payment.checked = mainCheck;
		}
		payments = [...payments];
	};

	const handlePrevPage = async () => {
		if (currentPage <= 0) {
			currentPage = 0;
			return;
		}
		currentPage--;
		await handeFechData();
	};

	const handleNextPage = async () => {
		const data = await nextPage(currentPage, totalPayments, rowPerPage);
		if (data) currentPage = data;
		await handeFechData();
	};
</script>

<main id="bg_payments">
	<div class="payments_table">
		<div class="payments_filter">
			<Filter />
		</div>
		<section class="payments_list">
			<table class="payments_list_content">
				<THead {mainCheck} {handleMainCheck} />
				<tbody class="payments_list_body">
					{#each payments as payment (payment.id)}
						<tr class={payment.checked ? 'selected' : ''}>
							<label class="control control--checkbox">
								<input
									type="checkbox"
									bind:checked={payment.checked}
									on:click={() => {
										handleCheck(payment.id);
									}}
								/>
								<div class="control__indicator" />
							</label>
							<td class="payments_list_body_td">
								<p>{payment.name}</p>
								<h5 class="small_text">{payment.email}</h5>
							</td>
							<td class="payments_list_body_td">
								<span class="payments_list_body--status {payment.status ? 'active' : 'inactive'}">
									<div
										class="status--mark {payment.status ? 'status--active' : 'status--inactive'}"
									/>
									{#if payment.status}
										Activo
									{:else}
										Inactivo
									{/if}
								</span>
								<h5 class="small_text">Last login: {new Date(payment.lastlogin).toDateString()}</h5>
							</td>
							<td class="payments_list_body_td">
								<span class="payments_list_body--status {payment.paid_status ? 'paid' : 'unpaid'}">
									<div
										class="status--mark {payment.paid_status ? 'status--paid' : 'status--unpaid'}"
									/>
									{#if payment.paid_status}
										Paid
									{:else}
										Unpaid
									{/if}
								</span>
								<h5 class="small_text">{new Date(payment.paid_date).toDateString()}</h5>
							</td>
							<td class="payments_list_body_td td--amount">
								<p><strong>${payment.amount}</strong></p>
								<h5 class="small_text">USD</h5>
							</td>
							<td class="">
								<p class="small_text">View More</p>
							</td>
						</tr>
					{/each}
				</tbody>

				<tfoot class="payments_list_footer">
					<tr>
						<td>{currentPage + 1} of {Math.ceil(totalPayments / rowPerPage)}</td>
						<td>
							<select bind:value={rowPerPage} class="custom-select" on:change={handeFechData}>
								<option value={6}>Rows per page 6</option>
								<option value={10}>Rows per page 10</option>
							</select>
						</td>
						<td>
							<div class="payments_list_footer--pages">
								<button class="custome-button" on:click={handlePrevPage}>
									<LeftArrow />
								</button>
								<button class="custome-button" on:click={handleNextPage}>
									<RightArrow />
								</button>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</section>
	</div>
</main>

<style>
	#bg_payments {
		background-color: var(--color-bg-parent);
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.payments_table {
		background-color: var(--color-white-100);
		width: 90%;
		max-width: 90em;
		border-radius: 0.375em;
		filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.2));
	}
	.payments_filter {
		padding: 1em;
	}
	.payments_list_content {
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 0.75em;
	}

	.payments_list_body_td {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.td--amount {
		text-align: right;
	}
	.small_text {
		color: var(--fonts-primary-variant);
		font-size: 0.875em;
	}

	.payments_list_body > tr {
		display: grid;
		grid-template-columns: 0.2fr 2fr 2fr 1fr 0.5fr 0.5fr;
		align-items: center;
		padding: 0.5em 1em;
		text-align: left;
		row-gap: 0.5em;
		column-gap: 1em;
	}

	.payments_list_body--status {
		border-radius: 4em;
		width: fit-content;
		padding: 0.5em 1em;
		display: flex;
		align-items: center;
		gap: 0.3125em;
	}
	.status--mark {
		width: 0.5em;
		height: 0.5em;
		border-radius: 100%;
	}
	.active {
		background-color: #e6e6f2;
		color: #4a4aff;
	}
	.inactive {
		color: var(--fonts-primary-variant);
		background-color: var(--color-bg-parent);
	}
	.status--inactive {
		background-color: var(--fonts-primary-variant);
	}
	.status--active {
		background-color: #4a4aff;
	}
	.paid {
		color: var(--color-positive);
		background-color: #cdffcd;
	}
	.unpaid {
		color: var(--color-negative);
		background-color: #e0b1b1;
	}

	.status--paid {
		background-color: var(--color-positive);
	}
	.status--unpaid {
		background-color: var(--color-negative);
	}

	.selected {
		background-color: var(--color-bg-stripe);
	}
	.payments_list_footer > tr {
		display: flex;
		flex-direction: row;
		justify-content: end;
		align-items: center;
		background-color: var(--color-bg-stripe);
		padding: 1em;
		color: var(--fonts-primary-variant);
		text-align: left;
		gap: 2em;
	}
	.payments_list_footer--pages {
		display: flex;
		flex-direction: row;
		gap: 4em;
		padding: 0 1em;
	}
	.custom-select {
		border: none;
		background-color: transparent;
		cursor: pointer;
		color: var(--fonts-primary-variant);
		font-size: 0.875em;
	}
	.custome-button {
		border: none;
		background-color: transparent;
		font-weight: 700;
		cursor: pointer;
		padding: 0.5em;
		border-radius: 2px;
	}
	.custome-button:hover {
		background-color: #fff;
	}
</style>
