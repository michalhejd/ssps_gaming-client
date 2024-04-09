<script lang="ts">
	import { IconAdjustmentsAlt } from '@tabler/icons-svelte';
	import ProfilePicture from './profilePicture.svelte';
	
	export let name: string;
	export let role: number;

	
</script>

<div class="profileCard">
	<ProfilePicture {name} />
	<div class="box">
		<div class="info">
			<div class="name">{ name }</div>
			<div class="role">{ (role == 0) ? "Hráč" : (role == 1) ? "Admin" : (role == 2) ? "Super admin" : (role == 3) ? "Root" : "Neznámá role"}</div>
		</div>
			<button class="edit">
			</button>
	</div>
</div>

<style lang="scss" scoped>
	.profileCard {
		display: flex;
		padding: 10px 20px;
		width: calc(100% - 20px);
		height: 70px;
		border-radius: 10px;
        align-items: center;
        .box{
            width: calc(100% - 40px);
            display: flex;
            justify-content: space-between;
            align-items: center;
		.info {
			display: flex;
			flex-direction: column;
			align-items: left;
			justify-content: center;
			margin-left: 10px;
			.name {
				font-size: 15px;
				color: #F5F5F5;
				font-weight: 300;
			}
			.role {
				font-size: 10px;
				font-weight: 500;
                color: #B7B7B7;
			}
		}
        .edit{
            background-color: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    } 
	}
</style>
