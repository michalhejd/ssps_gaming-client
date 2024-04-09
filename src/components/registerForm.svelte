<script lang="ts">
	import { goto } from '$app/navigation';
	import { req } from '../plugins/axios';
	import { verificationEmail } from '../stores/store';
	let loading: boolean = false;
	$: loading_class = loading ? 'loading' : '';

	let email = '';
	let name = '';
	let nickname = '';
	let password = '';
	let birthdate = '';

	//watched values
	let watchedEmail: string | undefined = undefined;

	let watchedName: string | undefined = undefined;

	let watchedNickname: string | undefined = undefined;

	let watchedPassword: string | undefined = undefined;

	let watchedBirthdate: string | undefined = undefined;

	//error messages
	let errorEmail: string | undefined = undefined;

	let errorName: string | undefined = undefined;

	let errorNickname: string | undefined = undefined;

	let errorPassword: string | undefined = undefined;

	let errorBirthdate: string | undefined = undefined;

	function register() {
		loading = true;
		req
			.post('/users/register', {
				email: email,
				name: name,
				nickname: nickname,
				password: password,
				birthdate: birthdate
			})
			.then((response) => {
				console.log(response);
				loading = false;
				verificationEmail.set(email);
				goto('/verification');
			})
			.catch((err) => {
				errorEmail = err.response.data.meta.message;
				errorPassword = err.response.data.meta.message;
				watchedEmail = email;
				loading = false;
				alert('Registrace se nezdařila');
			});
	}

	function watchForm() {
		if (watchedEmail?.length !== errorEmail?.length) {
			errorEmail = undefined;
		}
		if (watchedName?.length !== errorName?.length) {
			errorName = undefined;
		}
		if (watchedNickname?.length !== errorNickname?.length) {
			errorNickname = undefined;
		}
		if (watchedPassword?.length !== errorPassword?.length) {
			errorPassword = undefined;
		}
		if (watchedBirthdate?.length !== errorBirthdate?.length) {
			errorBirthdate = undefined;
		}
	}

	function checkForm() {
		if (email.length < 1) {
			errorEmail = 'Email nemůže být prázdný';
		}
		if (email.length > 0 && !email.includes('@')) {
			errorEmail = 'Email musí obsahovat @';
		}

		if (name.length < 1) {
			errorName = 'Jméno nemůže být prázdné';
		}

		if (nickname.length < 1) {
			errorNickname = 'Přezdívka nemůže být prázdná';
		}

		if (password.length < 1) {
			errorPassword = 'Heslo nemůže být prázdné';
		}

		if (birthdate.length < 1) {
			errorBirthdate = 'Datum narození nemůže být prázdné';
		}

		if (
			errorPassword === undefined &&
			errorEmail === undefined &&
			errorName === undefined &&
			errorNickname === undefined &&
			errorBirthdate === undefined
		) {
			return register();
		}
	}
</script>

<svelte:head />

<div class="form">
	<h1>Vítej na Playpeak</h1>
	<p>Platforma pro herní nadšence</p>
	<form on:submit={checkForm} novalidate>
		<div class="email">
			<label for="email" class:error={errorEmail !== undefined}>Email</label>
			<input
				type="email"
				name=""
				id="email"
				class:error={errorEmail !== undefined}
				bind:value={email}
				on:input={watchForm}
				placeholder="example@skola.ssps.cz"
			/>
		</div>
		{#if errorEmail !== undefined}
			<div class="errorEmail">
				<span class="material-symbols-outlined"> error </span>
				<p>{errorEmail}</p>
			</div>
		{/if}
		<div class="name">
			<label for="name" class:error={errorName !== undefined}>Jméno a příjmení</label>
			<input
				type="text"
				name=""
				id="name"
				class:error={errorName !== undefined}
				bind:value={name}
				on:input={watchForm}
				placeholder="Jan Novák"
			/>
		</div>
		{#if errorName !== undefined}
			<div class="errorName">
				<span class="material-symbols-outlined"> error </span>
				<p>{errorName}</p>
			</div>
		{/if}
		<div class="nickname">
			<label for="nickname" class:error={errorNickname !== undefined}>Přezdívka</label>
			<input
				type="text"
				name=""
				id="nickname"
				class:error={errorNickname !== undefined}
				bind:value={nickname}
				on:input={watchForm}
				placeholder="Janik"
			/>
		</div>
		{#if errorNickname !== undefined}
			<div class="errorNickname">
				<span class="material-symbols-outlined"> error </span>
				<p>{errorNickname}</p>
			</div>
		{/if}
		<div class="password">
			<label for="password" class:error={errorPassword !== undefined}>Heslo</label>
			<input
				type="password"
				name=""
				id="password"
				class:error={errorPassword !== undefined}
				bind:value={password}
				on:input={watchForm}
				placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
			/>
		</div>
		{#if errorPassword !== undefined}
			<div class="errorPassword">
				<span class="material-symbols-outlined"> error </span>
				<p>{errorPassword}</p>
			</div>
		{/if}
		<div class="birthdate">
			<label for="birthdate" class:error={errorBirthdate !== undefined}>Datum narození</label>
			<input
				type="date"
				name=""
				id="birthdate"
				class:error={errorBirthdate !== undefined}
				bind:value={birthdate}
				on:input={watchForm}
			/>
		</div>
		{#if errorBirthdate !== undefined}
			<div class="errorBirthdate">
				<span class="material-symbols-outlined"> error </span>
				<p>{errorBirthdate}</p>
			</div>
		{/if}
		<div class="button {loading_class}" on:mousedown={checkForm}>
			<input
				type="submit"
				style="position: absolute; left: -9999px; width: 1px; height: 1px;"
				tabindex="-1"
			/>
			{#if !loading}
				<p>Registrovat</p>
			{/if}
			{#if loading}
				<span class="loader" />
			{/if}
		</div>
		<p class="register">Už jsi se zaregistroval? <a href="/">Přihlaš se</a>!</p>
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
			.password > input {
				&::placeholder {
					font-size: 7px;
					letter-spacing: 1px;
				}
			}
			.errorEmail,
			.errorPassword,
			.errorName,
			.errorNickname,
			.errorBirthdate {
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
					color: var(--blue-text-color);
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
				background-color: var(--blue);
				color: var(--default-text-color);
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
					color: var(--blue-text-color);
					text-decoration: none;
					font-weight: 400;
					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}
</style>
