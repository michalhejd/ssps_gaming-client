<script lang="ts">
	import { req } from '../../plugins/axios';

	async function signSteam() {
		try {
			const response = await req.get('/users/steam', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
		} catch (e: any) {
			console.log(e);
			console.log(e.redirect)
		}
	}
</script>

<div class="profile">
	<p>Hello profile!</p>
	<button on:click={signSteam}>Přihlásit steam</button>
</div>
