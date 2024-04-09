// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import { goto } from "$app/navigation";
import { req } from "../plugins/axios";
import { token } from "../stores/store";
export const prerender = true;
export const csr = true;
export const ssr = false;

export const load = async () => {
    if(!localStorage.getItem('token')) return
    const user = await req.get('/users/@self',
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res).catch(err => err.response);
    if(user.status === 200) {
        goto('/profile');
        return user.data
    }
}