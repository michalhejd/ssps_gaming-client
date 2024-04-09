import { goto } from "$app/navigation";
import { req } from "../../../plugins/axios";
import { logout } from "../../../utils/manageUser";
export const prerender = true;
export const csr = true;
export const ssr = false;

export const load = async () => {
    try {
        const users: any = await req.get('/users',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (users.status === 200) {
            console.log(users.data.data)
            return {
                users: users.data.data
            }
        }
    } catch (error: any) {
        if(error.response.data.meta.error == "forbidden") return goto('/')
        if (error.response.data.meta.error === "token_unauthorized" || error.response.data.meta.error === "unauthorized") {
            return logout();
        }
    }
    return
}