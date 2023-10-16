<script>
	import { goto } from '$app/navigation';
	import ImgEmail from './../../assets/ImgEmail.svelte';
	import ImgPass from './../../assets/ImgPassword.svelte';
	import { loginText } from './../../const/const';

	let email = '';
	let password = '';

	const HOST = import.meta.env.VITE_BACKEND_HOST || 'localhost';

	async function handleOnSubmit() {
		try {
			const userData = {
				email,
				password
			};
			const response = await fetch(`http://${HOST}:5005/api/auth/login`, {
				method: 'POST',
				body: JSON.stringify(userData),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.status != 200) {
				alert('Email or Password error!');
				return;
			}
			const result = await response.json();
			localStorage.setItem('token', result.token);
			goto('/payments');
		} catch (error) {
			console.log(error);
		}
	}
</script>

<main class="main_form">
	<div class="form">
		<figure class="form_logo">
			<div class="logo_circle">t</div>
			<div class="logo_testing">testing</div>
		</figure>

		<header class="form_header">
			<h5 class="form_header_h5">Welcome</h5>
			<h1 class="form_header_h1">Log in</h1>
			<p class="form_header_p">Please fill your informations</p>
		</header>

		<form on:submit|preventDefault={handleOnSubmit} class="form_body">
			<div class="form_body_group">
				<div class="form_group--up">
					<div class="form_group--text">
						<label for="email" class="form_label">{loginText.email}</label>
						<input bind:value={email} type="email" placeholder="Account@email.com" required />
					</div>
					<ImgEmail />
				</div>
				<div class="form_group--down">
					<div class="form_group--text">
						<label for="password" class="form_label">{loginText.password}</label>
						<input bind:value={password} type="password" placeholder="Password" required />
					</div>
					<ImgPass />
				</div>
			</div>

			<div class="form_buttons">
				<button type="submit" class="form_buttons--submit">{loginText.login}</button>
				<button class="form_buttons--signup">{loginText.signup}</button>
			</div>
		</form>
	</div>
</main>

<style>
	.main_form {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1em;
	}
	.form_logo {
		display: flex;
		justify-content: center;
		gap: 1em;
		align-items: center;
		color: var(--color-base-800, #141416);
		font-family: 'Oleo Script Swash Caps';
	}
	.logo_circle {
		border-radius: 15.775px 15.775px 15.775px 3.606px;
		background: var(--color-secondary-900);
		padding: 0.3em;
		width: 1em;
		height: 1em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 1.875em;
		color: var(--color-white-100);
	}
	.logo_testing {
		font-size: 1.875em;
	}
	.form {
		display: flex;
		height: 100%;
		width: 24.375em;
		padding: 3em 1em;
		flex-direction: column;
		align-items: center;
		gap: 3em;
		border-radius: 1em;
		color: var(--color-base-800);
	}
	.form_header {
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1em;
	}
	.form_header_h5 {
		font-size: 1.25em;
		font-weight: 700;
	}
	.form_header_h1 {
		font-size: 3em;
		font-weight: 700;
	}
	.form_header_p {
		font-size: 0.875em;
		font-style: normal;
		font-weight: 500;
	}
	.form_body {
		display: flex;
		flex-direction: column;
		gap: 3em;
		width: 100%;
	}
	.form_body_group {
		gap: 0.5em;
		display: flex;
		flex-direction: column;
	}
	.form_group--up {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: var(--color-base-300);
		padding: 1.5em;
		gap: 0.5em;
		border-radius: 2em 2em 0.5em 0.5em;
	}
	.form_group--down {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: var(--color-base-300);
		padding: 1.5em;
		gap: 0.5em;
		border-radius: 0.5em 0.5em 2em 2em;
	}
	.form_group--text {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		width: 100%;
	}
	.form_label {
		font-size: 0.75em;
	}
	input {
		border: none;
		background-color: transparent;
		padding: 0.5em 0;
		font-size: 1em;
		font-weight: 700;
	}
	.form_buttons {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1em;
	}
	.form_buttons--submit {
		background-color: var(--color-primary-800);
		display: flex;
		width: 200px;
		padding: 16px 24px;
		justify-content: center;
		align-items: center;
		gap: 12px;
		border: none;
		border-radius: 6.25em;
		font-weight: 700;
		color: var(--color-white-100);
	}
	.form_buttons--signup {
		font-weight: 700;
		display: flex;
		padding: 16px 24px;
		justify-content: center;
		align-items: center;
		border: none;
		background-color: none;
	}
	.form_buttons--signup:hover {
		text-decoration: underline;
	}
	button {
		cursor: pointer;
		background-color: transparent;
	}
</style>
