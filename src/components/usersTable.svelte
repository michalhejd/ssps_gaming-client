<script lang="ts">
    import { req } from '../plugins/axios';
import { usersManageProfile } from '../stores/store';
import { goto } from '$app/navigation';

	export let users: any[] = [];

    let viewedUser: any = null

    let tbWidth: any = '0px'

	usersManageProfile.subscribe((v:any) => {
		viewedUser = v
        tbWidth = viewedUser ? '310px': '0px'
	});
    console.log(tbWidth)
    console.log(viewedUser)

    async function openUserProfile(id: any){
		if(viewedUser && viewedUser._id == id) return usersManageProfile.set(null)
        await req.get("/users/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            return usersManageProfile.set(res.data.data)
        }).catch((err) => {
            if(err.response.data.meta.error === "token_unauthorized" || err.response.data.meta.error === "unauthorized"){
                localStorage.removeItem("token")
                return goto("/")
            }
        })
    }
</script>

<div class="table" style="--tb-width: {tbWidth}">
	<table>
		<thead>
			<tr>
				<th> Id </th>
				<th> Email </th>
				<th> Name </th>
				<th> Nickname </th>
				<th> Birthdate </th>
				<th> Last activity </th>
				<th> Role </th>
				<th> Group </th>
				<th data-center> View </th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr>
					<td> {user._id} </td>
					<td> {user.email} </td>
					<td> {user.name} </td>
					<td> {user.nickname} </td>
					<td> {user.birthdate} </td>
					<td> {(user.lastActivity == undefined) ? "Žádná" : user.lastActivity} </td>
					<td >
						{user.role == 0
							? 'Hráč'
							: user.role == 1
							? 'Admin'
							: user.role == 2
							? 'Super admin'
							: user.role == 3
							? 'Root'
							: 'Neznámá role'}
					</td>
					<td> {(user.group == undefined) ? "Žádná" : user.group} </td>
					<td data-center>	
						<div class="box" class:active={viewedUser && (viewedUser._id == user._id) } on:mousedown={() => openUserProfile(user._id)}>
							<span class="material-symbols-outlined"> visibility </span>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss" scoped>
	/*::-webkit-scrollbar {
		width: 7px;
	}
	::-webkit-scrollbar-thumb {
        border-radius: 5px;
		background: #232323;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}*/
	.table {
		height: 650px;
		overflow-y: scroll;
		border-radius: 5px;
        width: calc(100% - var(--tb-width));
		table {
            width: 100%;
			background-color: #121212;
			border-collapse: collapse;
			-webkit-border-horizontal-spacing: -0px;
			-webkit-border-vertical-spacing: -0px;
			//border top left and top right 5 px
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			th {
				position: sticky;
				top: 0;
				padding: 10px;
				color: #707070;
				font-weight: 400;
				font-size: 10px;
				text-align: left;
				background-color: var(--header-color);
				white-space: nowrap;
				&:nth-child(1) {
					border-top-left-radius: 5px;
				}
				&:nth-child(9) {
					border-top-right-radius: 5px;
				}
			}
			th[data-center] {
				text-align: center;
			}
			td[data-center] {
				text-align: center;
			}
			td {
				padding: 10px;
				color: #a0a0a0;
				font-weight: 400;
				font-size: 10px;
				text-align: left;
				vertical-align: middle;
				.box {
					cursor: pointer;
					margin-left: auto;
					margin-right: auto;
					border-radius: 3px;
					background-color: #292929;
					width: 20px;
					height: 20px;
					display: flex;
					justify-content: center;
					align-items: center;
					.material-symbols-outlined {
						font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24;
						font-size: 14px;
					}
					&.active{
						background-color: #929292;
						color: #e0e0e0;
					}	
				}
			}
			tr {
				&:hover {
					background-color: #1e1e1e;
				}
			}
		}
	}
</style>
