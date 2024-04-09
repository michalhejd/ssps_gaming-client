// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import { req } from "../../plugins/axios";
import { goto } from "$app/navigation";
import { token } from "../../stores/store";
import { logout } from "../../utils/manageUser";
export const prerender = true;
export const csr = true;
export const ssr = false;

export const load = async () => {
    if (!localStorage.getItem('token')) return goto('/');
    try {
        const user: any = await req.get('/users/@self',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (user.status === 200) {
            return {
                me: user.data.data
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

