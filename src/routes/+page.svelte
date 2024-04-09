<script>
	import LoginForm from '../components/loginForm.svelte';
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="login">
	<LoginForm />
</div>

<style lang="scss" scoped>
	.login{
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
