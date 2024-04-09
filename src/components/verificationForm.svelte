<script lang="ts">
	import { goto } from '$app/navigation';
	import { req } from '../plugins/axios.js';
	import { verificationEmail } from '../stores/store.js';

	let loading: boolean = false;
	$: loading_class = loading ? 'loading' : '';

	export let email: any;

	verificationEmail.subscribe((v: any) => (email = v));

	let code = '';

	let watchedEmail: string | undefined = undefined;

	let watchedPassword: string | undefined = undefined;

	let errorEmail: string | undefined = undefined;

	let errorPassword: string | undefined = undefined;

	// input only numbers function

	function onlyNumbers(evt: any) {
		console.log(evt)
		var charCode = evt.which ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
		return true;
	}

	function login() {
		loading = true;
		req
			.patch('/users/verify', {
				email: email,
				code: code
			})
			.then((response) => {
				console.log(response);
				loading = false;
				goto('/');
			})
			.catch((err) => {
				console.log(err);
				errorEmail = err.response.data.meta.message;
				errorPassword = err.response.data.meta.message;
				loading = false;
			});
	}

	function watchForm() {
		if (watchedEmail?.length !== errorEmail?.length) {
			errorEmail = undefined;
		}
		if (watchedPassword?.length !== errorPassword?.length) {
			errorPassword = undefined;
		}
	}

	function checkForm() {
		if (code.length < 1) {
			errorPassword = 'Kód nemůže být prázdný';
		}
		if (code.length > 6) {
			errorPassword = 'Kód nemůže být delší než 6 znaků';
		}
		if (errorPassword === undefined && errorEmail === undefined) {
			return login();
		}
	}
</script>

<svelte:head />

<div class="form">
	<h1>Vítej na Playpeak</h1>
	<p>Platforma pro herní nadšence</p>
	<form on:submit={checkForm} novalidate>
		<div class="email">
			<div class="box">
				<div class="icon">
					<span class="material-symbols-outlined"> email </span>
				</div>
				<p>{email}</p>
			</div>
		</div>
		<div class="code">
			<label for="code" class:error={errorPassword !== undefined}>Heslo</label>
			<input
				type="text"
				pattern="[0-9]"
				autocomplete="off"
				id="code"
				maxlength="6"
				class:error={errorPassword !== undefined}
				bind:value={code}
				on:input|preventDefault={onlyNumbers}
				on:input={watchForm}
				placeholder="123456"
			/>
		</div>
		{#if errorPassword !== undefined}
			<div class="errorPassword">
				<span class="material-symbols-outlined"> error </span>
				<p>{errorPassword}</p>
			</div>
		{/if}
		<p class="lostPassword">
			Zapomněl jsi své heslo? Obnov si ho <a href="/resetPassword">zde</a>.
		</p>
		<div class="button {loading_class}" on:mousedown={checkForm}>
			<input
				type="submit"
				style="position: absolute; left: -9999px; width: 1px; height: 1px;"
				tabindex="-1"
			/>
			{#if !loading}
				<p>Ověřit</p>
			{/if}
			{#if loading}
				<span class="loader" />
			{/if}
		</div>
		<p class="register">Nemáš ještě účet? <a href="/register">Zaregistruj se</a>!</p>
	</form>
</div>

<style lang="scss" scoped>
	$input-height: 40px;
	.form {
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		width: 400px;

		h1 {
			font-size: 28px;
			color: var(--default-text-color);
			font-weight: 700;
			margin-bottom: 0.5rem;
		}
		> p {
			font-size: 13px;
			color: var(--secondary-text-color);
			font-weight: 300;
			margin-bottom: 1rem;
		}
		form {
			display: flex;
			flex-direction: column;
			align-items: left;
			justify-content: center;
			> div {
				margin-top: 5px;
			}
			label {
				font-size: 10px;
				color: var(--secondary-text-color);
				font-weight: 300;
				margin-left: 2px;
				&.error {
					color: #ff4d4d;
				}
			}
			input {
				outline: none;
				border: 0;
				border: 1px solid #454545;
				width: 100%;
				height: $input-height;
				border-radius: 5px;
				padding: 0 12px;
				font-size: 12px;
				color: var(--third-text-color);
				background-color: transparent;
				font-weight: 300;
				margin-top: 2px;
				&:focus {
					border: 1px solid #838383;
				}
				&::placeholder {
					color: #6f6f6f;
				}
				&.error {
					border: 1px solid #ff4d4d;

					//shake
					animation: shake 0.3s;
					animation-iteration-count: 1;

					//shake on x axis
					@keyframes shake {
						0% {
							transform: translateX(0);
						}
						20% {
							transform: translateX(-2px);
						}
						40% {
							transform: translateX(2px);
						}
						60% {
							transform: translateX(-2px);
						}
						80% {
							transform: translateX(2px);
						}
						100% {
							transform: translateX(0);
						}
					}
				}
			}
			.errorEmail,
			.errorPassword {
				margin-top: 5px;
				display: flex;
				align-items: center;
				margin-left: 3px;
				margin-bottom: -2px;

				.material-symbols-outlined {
					font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 12;
					color: #ff4d4d;
					font-size: 18px;
				}
				p {
					margin-left: 3px;
					color: #ff4d4d;
					font-size: 8px;
					font-weight: 400;
				}
			}
			> p {
				margin-left: 2px;
				margin-top: 7px;
				font-size: 10px;
				color: var(--third-text-color);
				font-weight: 300;
				a {
					color: var(--default-text-color);
					text-decoration: none;
					font-weight: 400;
					&:hover {
						text-decoration: underline;
					}
				}
			}
			.button {
				margin-top: 15px;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: $input-height;
				background-color: #58ff9b;
				color: #000000;
				border-radius: 5px;
				-webkit-user-select: none; /* Safari */
				-ms-user-select: none; /* IE 10 and IE 11 */
				user-select: none; /* Standard syntax */
				cursor: pointer;
				p {
					font-size: 12px;
					font-weight: 400;
					margin: 0;
					user-select: none;
					-webkit-user-select: none; /* Safari */
					-ms-user-select: none; /* IE 10 and IE 11 */
					user-select: none; /* Standard syntax */
				}
				.loader {
					width: 15px;
					height: 15px;
					border: 3px solid #fafafa;
					border-bottom-color: transparent;
					border-radius: 50%;
					display: inline-block;
					box-sizing: border-box;
					animation: rotation 1s linear infinite;
					-webkit-user-select: none; /* Safari */
					-ms-user-select: none; /* IE 10 and IE 11 */
					user-select: none; /* Standard syntax */
				}

				@keyframes rotation {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
				&.loading {
					cursor: not-allowed;
				}
			}
			p.register {
				font-size: 11px;
				color: var(--third-text-color);
				font-weight: 300;
				margin-top: 10px;
				text-align: center;
				a {
					color: var(--default-text-color);
					text-decoration: none;
					font-weight: 400;
					&:hover {
						text-decoration: underline;
					}
				}
			}
			.box {
				width: 100%;
				height: $input-height + 10px;
				border-radius: 5px;
				background-color: #1d1d1d;
				display: flex;
				align-items: center;
				padding: 0 20px 0 0px;
				.material-symbols-outlined {
					font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 16;
					color: var(--third-text-color);
					font-size: 21px;
				}
				p {
					margin-left: 10px;
					font-size: 14px;
					color: var(--third-text-color);
					font-weight: 400;
				}
			}
			.icon {
				width: $input-height + 10px;
				height: $input-height + 10px;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #202020;
				border-radius: 5px 0 0 5px;
				.material-symbols-outlined {
					font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 16;
					color: var(--third-text-color);
					font-size: 21px;
				}
			}
		}
	}
</style>
