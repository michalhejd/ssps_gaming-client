<script lang="ts">
	import './styles.scss';
	import './reset.scss';
	import { onMount } from 'svelte';
	import { onBeforeUnload, onLoad } from '../utils/manageUser';

	onMount(async () => {
		onLoad();
		if (typeof window !== 'undefined') {
			window.addEventListener('beforeunload', onBeforeUnload);

			return () => {
				window.removeEventListener('beforeunload', onBeforeUnload);
			};
		}
	});
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
</style>
