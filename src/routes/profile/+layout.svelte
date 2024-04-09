<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ProfileCard from '../../components/profileCard.svelte';
	import { req } from '../../plugins/axios';
	import type { LayoutData } from './$types';
	import { logout } from '../../utils/manageUser';

	export let data: LayoutData;
    let me = data.me

</script>

<div class="profile">
	<div class="sideNav">
		<ProfileCard name={me.name} role={me.role} />
		<nav>
			<div class="items">
				<a href="/profile" class:active={$page.url.pathname == '/profile'}>
					<div class="box">
						<p>Domů</p>
					</div>
				</a>
				<a href="/profile/tournaments" class:active={$page.url.pathname == '/profile/tournaments'}>
					<div class="box">
						<p>Turnaje</p>
					</div>
				</a>
				<a href="/profile/teams" class:active={$page.url.pathname == '/profile/teams'}>
					<div class="box">
						<p>Týmy</p>
					</div>
				</a>
                <a href="/profile/tournamentsmanage" class:active={$page.url.pathname == '/profile/tournamentsmanage'}>
					<div class="box">
						<p>Správa turnajů</p>
					</div>
				</a>
				<a href="/profile/usersmanage" data-sveltekit-preload-data="hover" class:active={$page.url.pathname == '/profile/usersmanage'}>
					<div class="box">
						<p>Správa uživatelů</p>
					</div>
				</a>
                <a href="/profile/teamsmanage" class:active={$page.url.pathname == '/profile/teamsmanage'}>
					<div class="box">
						<p>Správa týmů</p>
					</div>
				</a>
                <a href="/profile/gamesmanage" class:active={$page.url.pathname == '/profile/gamesmanage'}>
					<div class="box">
						<p>Správa her</p>
					</div>
				</a>
				<div class="box" on:mousedown={logout}>
					<p>Odhlásit</p>
				</div>
			</div>
		</nav>
	</div>
	<div class="content">
		<slot />
	</div>
</div>

<style lang="scss" scoped>
    $sideNav-width: 300px;
	.profile {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
		.sideNav {
			width: $sideNav-width;
			height: 100%;
			padding: 60px 20px;
			nav {
				margin-top: 20px;
				margin-left: 15px;
				.items {
					display: flex;
					flex-direction: column;
					align-items: left;
					justify-content: center;
					margin: 10px 0;
					a {
						margin-top: 5px;
						font-size: 13px;
						color: #f5f5f5;
						font-weight: 300;
						text-decoration: none;
						&.active > .box {
							background-color: #121212;
						}
					}
					.box {
						padding: 15px 25px;
						width: 100%;
						border-radius: 5px;
						cursor: pointer;
						p {
							margin-left: 5px;
							font-weight: 300;
							font-size: 13px;
							color: var(--default-text-color);
						}
						&:hover {
							background-color: #121212;
						}
					}
				}
			}
		}
		.content {
			width: calc(100% - $sideNav-width);
			height: 100%;
            padding: 100px 20px;
		}
	}
</style>
