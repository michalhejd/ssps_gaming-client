<script lang="ts">
	import { req } from '../../../plugins/axios';
	import { goto } from '$app/navigation';
	import UsersTable from '../../../components/usersTable.svelte';
	import type { PageData } from './$types';
	import { usersManageProfile } from '../../../stores/store';
	import { timeFormat, timeFormatToLocale } from '../../../utils/timeFormatter';
	import { logout } from '../../../utils/manageUser';
	import ProfilePicture from '../../../components/profilePicture.svelte';

	export let data: PageData;
	let users = data.users.users;

	let searchValue = '';

	function search() {
		console.log('fetching users');
		console.log(searchValue);
		req
			.get('/users', {
				params: {
					whispering: searchValue
				},
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token')
				}
			})
			.then((res) => {
				users = res.data.data.users;
			})
			.catch((error) => {
				if (
					error.response.data.meta.error === 'token_unauthorized' ||
					error.response.data.meta.error === 'unauthorized'
				) {
					return logout();
				}
			});
	}

	let user: any = null;

	usersManageProfile.subscribe((v: any) => {
		user = v;
	});
</script>

<div class="usersManage">
	<div class="r1">
		<div class="search">
			<label for="search">
				<span class="material-symbols-outlined"> search </span>
			</label>
			<input
				type="text"
				id="search"
				placeholder="Search"
				bind:value={searchValue}
				on:input={search}
			/>
		</div>
		<div class="addUser" />
	</div>
	<div class="r2">
		<UsersTable {users} />
		{#if user}
			<div class="userProfile">
				<div class="userProfileHeader">
					<p>{user.name}</p>
				</div>
				<div class="userProfileData">

					<div class="userProfileDataMain">
						<ProfilePicture name={user.name} />
						<div class="userProfileDataMainInputs">
							<label for="name">Jméno</label>
							<input type="text" name="name" id="name" value={user.name} />
							<label for="email">Email</label>
							<input type="email" name="email" id="email" value={user.email} />
						</div>
					</div>
					<!-- input with value of user.email-->
					<p>{user.nickname}</p>
					<input type="text" name="nickname" id="nickname" value={user.nickname} />
					<p>{user.role}</p>
					<p>{user.group == undefined ? 'Žádná' : user.group}</p>
					<p>{user.lastActivity == undefined ? 'Žádná' : timeFormatToLocale(user.lastActivity)}</p>
					<p>{timeFormat(user.birthdate)}</p>
					<input type="date" name="birthdate" id="birthdate" value={timeFormat(user.birthdate)} />
					<p>{user.verified}</p>
					<p>{timeFormatToLocale(user.createdAt)}</p>
					<p>{timeFormatToLocale(user.updatedAt)}</p>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.r1 {
		display: flex;
		.search {
			width: 400px;
			padding-left: 10px;
			border-radius: 5px;
			background-color: #161616;
			margin-bottom: 10px;
			display: flex;
			label {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			input {
				width: calc(100% - 20px);
				padding: 10px;
				font-size: 12px;
				background-color: transparent;
				color: #b7b7b7;
				&::placeholder {
					color: #414141;
				}
			}
		}
	}
	.r2 {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		.userProfile {
			width: 300px;
			height: 100%;
			background-color: #121212;
			font-size: 10px;
			font-weight: 300;
			color: #a0a0a0;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			.userProfileHeader {
				position: sticky;
				top: 0;
				padding: 10px;
				color: #707070;
				font-weight: 400;
				font-size: 10px;
				text-align: left;
				background-color: var(--header-color);
				white-space: nowrap;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
			}
			.userProfileData {
				padding: 10px;
				label{
					font-size: 10px;
					color: #707070;
					font-weight: 400;
					margin-bottom: -3px;
				}
				input {
					background-color: var(--input-color);
					margin: 5px 0px;
					padding: 6px;
					width: 100%;
					color: #b3b3b3;
					border-radius: 3px;
				}
				.userProfileDataMain{
					display: flex;
					gap: 10px;
					.userProfileDataMainInputs{
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
					}
				}
			}
		}
	}
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24;
		font-size: 16px;
		color: #414141;
	}
</style>
