<script lang="ts">
    import type { PageData } from './$types';
	import VerificationForm from "../../components/verificationForm.svelte";

    export let email: PageData
    console.log(email)
</script>

<svelte:head>
	<title>Verification</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="verification">
	<VerificationForm email={email} />
</div>

<style lang="scss" scoped>
	.verification{
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
